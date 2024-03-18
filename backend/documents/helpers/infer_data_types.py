import pandas as pd
import numpy as np
import ast


def is_complex(value):
    """
    Is value a complex number?
    :param value: value to check
    :return: True if value is
    """
    try:
        complex(value.replace(" ", "").replace("i", "j"))
        return True
    except (ValueError, AttributeError):
        return False


def infer_and_convert_data_types(df):
    """
    This function will infer the data types of the columns in a dataframe and convert them to numeric, boolean or datetime if possible.
    :param df: pandas dataframe to infer the data types of the columns in it.
    :return: pandas dataframe with converted data types.
    """
    try:
        for col in df.columns:
            column_data = df[col].unique().tolist()
            try:
                # Check for boolean values
                if set(df[col].unique()) == {0, 1}:
                    df[col] = df[col].astype(bool)
                    continue
            except (ValueError, TypeError):
                pass
            try:
                # Check for timedelta
                if pd.api.types.is_timedelta64_dtype(df[col]):
                    df_converted_to_time_delta = pd.to_timedelta(
                        df[col], errors="coerce"
                    )
                    if (
                        not df_converted_to_time_delta.isna().all()
                    ):  # If at least one value is timedelta
                        df[col] = df_converted_to_time_delta
                        continue
            except (ValueError, TypeError):
                pass

            try:
                # Check if complex number
                if all(is_complex(value) for value in df[col]):
                    df[col] = df[col].astype(complex)
                    continue
            except (ValueError, TypeError):
                pass

            try:
                is_int = lambda x: isinstance(x, (int, float))  # noqa
                int_count = sum(map(is_int, column_data))
                # Attempt to convert to numeric first
                if int_count > len(column_data) / 2:
                    df_converted = pd.to_numeric(df[col], errors="coerce")
                    if (
                        not df_converted.isna().all()
                    ):  # If at least one value is numeric
                        df[col] = df_converted
                        continue
            except (ValueError, TypeError):
                pass

            # Attempt to convert to datetime
            try:
                df_converted_to_datetime = pd.to_datetime(df[col], errors="coerce")
                if (
                    not df_converted_to_datetime.isna().all()
                ):  # If at least one value is datetime
                    df[col] = df_converted_to_datetime
                    continue
            except (ValueError, TypeError):
                pass

            try:
                # Check for list-like strings and convert to lists
                if (
                    df[col]
                    .apply(
                        lambda x: isinstance(x, str)
                        and x.startswith("[")
                        and x.endswith("]")
                    )
                    .all()
                ):
                    df_converted_to_list = df[col].apply(
                        lambda x: isinstance(x, (list, tuple, np.ndarray))
                    )
                    if (
                        not df_converted_to_list.isna().all()
                    ):  # If at least one value is list
                        df[col] = df[col].apply(ast.literal_eval)
                        continue
            except (ValueError, SyntaxError):
                pass
            try:
                # Check for list-like strings and convert to dictionaries
                if (
                    df[col]
                    .apply(
                        lambda x: isinstance(x, str)
                        and x.startswith("{")
                        and x.endswith("}")
                    )
                    .all()
                ):
                    df_converted_to_dict = df[col].apply(lambda x: isinstance(x, dict))
                    if (
                        not df_converted_to_dict.isna().all()
                    ):  # If at least one value is dictionary
                        df[col] = df[col].apply(ast.literal_eval)
                        continue
            except (ValueError, SyntaxError):
                pass
            # Check if the column should be categorical
            if (
                len(df[col].unique()) / len(df[col]) < 0.5
            ):  # Example threshold for categorization
                df[col] = pd.Categorical(df[col])
        return df
    except AttributeError:
        pass


def process_file(file_path, chunk_size=1000):
    """
    Process a file and yield the dataframe
    :param file_path: path to the file to be processed.
    :param chunk_size:  size of the chunks to be read.
    :return:  a generator of dataframes
    """
    file_type = file_path.content_type
    if file_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        excel_file = pd.ExcelFile(file_path)
        reader = pd.read_excel(excel_file)
        yield infer_and_convert_data_types(reader)
    else:
        reader = pd.read_csv(file_path, chunksize=chunk_size)
        for chuck in reader:
            yield infer_and_convert_data_types(chuck)
