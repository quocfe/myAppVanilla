function Validator(options) {
  let selectorRules = {};
  // function thuc thi validate
  function validate(inputElement, rule) {
    const messageElement = inputElement.parentElement.querySelector(".form-message");

    let messageError;
    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; ++i) {
      messageError = rules[i](inputElement.value);
      if (messageError) break;
    }

    if (messageError) {

      messageElement ? messageElement.innerText = messageError : ''
      inputElement.parentElement.classList.remove("valid")
      inputElement.parentElement.classList.add("invalid")
    } else {
      messageElement ? messageElement.innerText = '' : ''
      inputElement.parentElement.classList.remove("invalid")
      inputElement.parentElement.classList.add("valid")
    }
    return !messageError
  }
  // 
  const formElement = document.querySelector(options.form);
  if (formElement) {

    formElement.onsubmit = (e) => {
      e.preventDefault()

      let isFormValid = true;

      options.rules.forEach(rule => {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule)
        if (!isValid) {
          isFormValid = false;
        }
      });


      if (isFormValid) {
        if (typeof options.onsubmit === 'function') {
          let enableInputs = formElement.querySelectorAll('[name]:not(disabled)');
          let arrEnableInput = [...enableInputs];
          let formValue = arrEnableInput.reduce((values, input) => {
            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                break;
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'file':
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          }, {})
          options.onsubmit(formValue)
        }
        else {
          formElement.submit();
        }
      }
    }


    options.rules.forEach(rule => {
      // lưu lại rule cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test)
      } else {
        selectorRules[rule.selector] = [rule.test];

      }
      const inputElement = formElement.querySelector(rule.selector);
      const messageElement = inputElement.parentElement.querySelector(options.errorMessage);

      if (inputElement) {
        inputElement.oninput = () => {
          validate(inputElement, rule)
        }
        inputElement.onblur = () => {
          validate(inputElement, rule)
        }
      }
    });
  }
}

// dinh nghia rule
Validator.isRequired = (selector) => {
  return {
    selector,
    test: (value) => value.trim() ? undefined : "Vui lòng nhập trường này!"
  }
}

Validator.isTrim = (selector) => {
  return {
    selector,
    test: (value) => {
      const regex = /\s/;
      return regex.test(value) ? "Không được chứa khoảng trắng" : ""
    }
  }
}

Validator.isEmail = (selector) => {
  return {
    selector,
    test: (value) => {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : 'Trường này phải là email'
    }
  }
}

Validator.isNumberPhone = (selector) => {
  return {
    selector,
    test: (value) => {
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      return regex.test(value) ? undefined : "Số điện thoại không hợp lệ!";
    }
  }
}

Validator.isMinLength = (selector, minLength) => {
  return {
    selector,
    test: (value) => {
    return value.length < minLength ? `Mật khẩu quá ngắn. Độ dài tối thiểu là ${minLength} ký tự.` : ""
    }
  }
},

Validator.isStrongPass = (selector) => {
  return {
    selector,
    test: (value) => {
      if (!/[A-Z]/.test(value)) {
        return "Mật khẩu cần có ít nhất một ký tự viết hoa.";
      }

      if (!/[a-z]/.test(value)) {
        return "Mật khẩu cần có ít nhất một ký tự viết thường.";
      }

      if (!/\d/.test(value)) {
        return "Mật khẩu cần có ít nhất một chữ số.";
      }

      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
        return "Mật khẩu cần có ít nhất một ký tự đặc biệt.";
      }

      return "";
    },
  }
}

Validator.isPasswordConfirm = (selector, isConfirm) => {
  return {
    selector,
    test: (value) => {
      return value === isConfirm() ? undefined : "Mật khẩu không chính xác!"
    }
  }
}

export default Validator