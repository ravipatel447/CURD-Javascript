'use-strict'
const table = document.querySelector('.table');
const detais = [
    {
        productId:1,
        productName:"Mobile",
        productImageSrc:"https://source.unsplash.com/featured/100x72",
        productPrice:200,
        productDesc:"This is Mi Mobile phone"
    },
    {
        productId:2,
        productName:"Laptop",
        productImageSrc:"https://source.unsplash.com/featured/100x73",
        productPrice:200,
        productDesc:"This is Apple's macbook"
    },
    {
        productId:3,
        productName:"Tv",
        productImageSrc:"https://source.unsplash.com/featured/99x72",
        productPrice:300,
        productDesc:"This is Sony tv"
    }
]

const rendar = ({productId,productName,productImageSrc,productPrice,productDesc})=>{
    var html = `<tr>
    <td>${productId}</td>
    <td>${productName}</td>
    <td>
        <img src="${productImageSrc}"/>
    </td>
    <td>${productPrice}$</td>
    <td>${productDesc}</td>
  </tr>`;
    document.querySelector('.table').insertAdjacentHTML('beforeend',html);
}
rendar(detais[0]);