exports.ValidateName = (name) => {
  
  const a = String(name).match(
    /^[a-zA-Z\s-]+$/
  );
    //console.log(a);
  return a != null ? true : false;
};
exports.ValidatePassword = (password) => {
  const a = String(password).match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,20}$/
  );

  return a != null ? true : false;
};

exports.ValidateEmail = (email) => {
  const a = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return a != null ? true : false;
};
