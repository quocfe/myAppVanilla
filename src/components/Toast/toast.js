import style from "./toast.module.css";

const toast = ({title = '', message = '', type = '' ,show = false}) => {

  const bodyTag = document.querySelector('body');
  const template = `

    <div class="${style.toast_message} ${type != 'error' ? style.success : style.error} ${show ? style.show : ''}">
      <div class="d-flex align-items-center justify-content-between h-100"> 
        <div class=${style.toast__icon}> 
          <i class="fa-solid ${type != 'error' ? "fa-check" : "fa-x"}"></i>
        </div>
        <div class="d-flex flex-column h-100 align-items-left justify-content-evenly"> 
          <h3 class="${style.toast_title} mb-0">${title}</h3>
          <p class="toast-msg mb-0">${message}</p>
        </div>
        <div class=${style.toast_lose}>
            <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
  `
  bodyTag.insertAdjacentHTML('afterbegin', template)
};

export default toast;

