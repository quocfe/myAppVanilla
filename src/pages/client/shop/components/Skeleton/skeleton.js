import * as style from "./style.module.css"

const skeleton = () => {
  const template = 
  `
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
    <div class="${style.card_container}"> 
      <div class="${style.card}">
        <div class="${style.cover_image_skeleton}"></div>
        <div class="${style.avatar_skeleton}"></div>
        <div class="${style.skeleton_loader}"></div>
        <div class="${style.skeleton_loader}"></div> 
        <div class="${style.skeleton_loader}"></div> 
      </div>
    </div>
  </div>
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
    <div class="${style.card_container}"> 
      <div class="${style.card}">
        <div class="${style.cover_image_skeleton}"></div>
        <div class="${style.avatar_skeleton}"></div>
        <div class="${style.skeleton_loader}"></div>
        <div class="${style.skeleton_loader}"></div> 
        <div class="${style.skeleton_loader}"></div> 
      </div>
    </div>
  </div>
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
  <div class="${style.card_container}"> 
    <div class="${style.card}">
      <div class="${style.cover_image_skeleton}"></div>
      <div class="${style.avatar_skeleton}"></div>
      <div class="${style.skeleton_loader}"></div>
      <div class="${style.skeleton_loader}"></div> 
      <div class="${style.skeleton_loader}"></div> 
    </div>
  </div>
  </div>
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
  <div class="${style.card_container}"> 
    <div class="${style.card}">
      <div class="${style.cover_image_skeleton}"></div>
      <div class="${style.avatar_skeleton}"></div>
      <div class="${style.skeleton_loader}"></div>
      <div class="${style.skeleton_loader}"></div> 
      <div class="${style.skeleton_loader}"></div> 
    </div>
  </div>
  </div>
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
  <div class="${style.card_container}"> 
    <div class="${style.card}">
      <div class="${style.cover_image_skeleton}"></div>
      <div class="${style.avatar_skeleton}"></div>
      <div class="${style.skeleton_loader}"></div>
      <div class="${style.skeleton_loader}"></div> 
      <div class="${style.skeleton_loader}"></div> 
    </div>
  </div>
  </div>
  <div class="col-lg-4 mb-4 col-md-6 col-sm-6"> 
  <div class="${style.card_container}"> 
    <div class="${style.card}">
      <div class="${style.cover_image_skeleton}"></div>
      <div class="${style.avatar_skeleton}"></div>
      <div class="${style.skeleton_loader}"></div>
      <div class="${style.skeleton_loader}"></div> 
      <div class="${style.skeleton_loader}"></div> 
    </div>
  </div>
  </div>
`
  return template

};

export default skeleton;