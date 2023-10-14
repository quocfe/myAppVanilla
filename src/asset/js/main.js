const userIconTag = document.querySelector('.icon-user');
userIconTag.classList.remove('show');
userIconTag.addEventListener('click', function () {
	if (this.classList.contains('show')) {
		this.classList.remove('show');
	} else {
		this.classList.add('show');
	}
});
