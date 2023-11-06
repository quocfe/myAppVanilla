const notFound = () => {
	const template = `
  <div class="page404">
    <div class="">
        <h1 class="page-title">404</h1>
        <p class="page-desc">Ops! Trang bạn tìm kiếm không tồn tại.</p>
    </div>
  </div> 
  `;
	return template;
};

export default notFound;
