// tslint:disable-next-line:max-line-length
export const  urlFormatRegexp = new RegExp(/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/, "i");

export const validateURL = (url) => {
    return urlFormatRegexp.test(url);
};

export const constructError = (err) => {
    const errorResp = {
      error: "",
      message: ""
    };
    if (err && err.error && err.error.details && Array(err.error.details).length > 0) {
      return errorResp.error = err.error.details.map((e) => e.context.key).join(",").concat(" is missing");
    }
    return errorResp.error = err;
  }