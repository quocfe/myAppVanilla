import * as style from './style.module.css';

const invoice = () => {
	const template = `
<div class=${style.invoice} id="invoice">
  <div class="${style.header}">
    <div class="${style.header_left}">
      <div class="${style.logo}">
        <a href="/">
          <img src="" alt="">
        </a>
      </div>
      <div class="${style.thanks_text}">
        <p>Hello, <span> PhuQuocNguyen</span></p>
        <p>Thank you for your order.</p>
      </div>
    </div>
    <div class="${style.header_right}">
      <div class="${style.invoice_text}">
        <p>Hóa đơn</p>
      </div>
      <div class="${style.invoice_date}">
        <p>Order #<span>83</span></p>
        <p>2023-10-14</p>
      </div>
    </div>
  </div>
  <div class="${style.main}">
    <div class="${style.info_product}">
      <ul class="${style.head}">
        <li>Tên sản phẩm</li>
        <li>Số lượng</li>
        <li>Đơn giá</li>
        <li>Tổng</li>
      </ul>
      <div class="${style.content_wrapper}">
        <ul class="${style.content}">
          <li>Cà phê Blagu hạt đã rang, Bourbon Cầu Đất, Medium Roast, 250g</li>
          <li>1</li>
          <li>325,000VNĐ</li>
          <li>325,000VNĐ</li>
        </ul>
      </div>
    </div>
    <div class="${style.info_total}">
            <ul>
        <li>
          <p>Tạm tính</p>
          <p>325,000VNĐ</p>
        </li>
        <li>
          <p>Phí vận chuyển</p>
          <p>0VNĐ</p>
        </li>
        <li>
          <p>Giảm giá</p>
          <p>0</p>
        </li>
        <li>
          <p>Total</p>
          <p>325,000VNĐ</p>
        </li>
      </ul>
    </div>
    <div class="${style.info_bill}">
      <ul>
        <li>
          <p>BILLING INFORMATION</p>
        </li>
        <li>
          <p>
          PhuQuocNguyen
          </p>
        </li>
        <li>
          <p style="margin-bottom: 10px;">thôn tân bình,</p>
          <p style="margin-bottom: 10px;"> Phường Phúc Xá,</p>
          <p style="margin-bottom: 10px;"> Quận Ba Đình,</p>
          <p style="margin-bottom: 10px;"> Thành phố Hà Nội,</p>
        </li>

      </ul>
      <ul>
        <li>
          <p>PAYMENT INFORMATION</p>
        </li>
        <li>
          <p>COD</p>
        </li>
      </ul>
    </div>
  </div>
</div>
  `;
	return template;
};

export default invoice;
