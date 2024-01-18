async function productData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error("Получена ошибка при обработке data.json");
        }
        const data = await response.json();
        console.log(data);
        const containerBox = document.querySelector('.container_box');
        data.forEach(({ products_item_photo, products_item_title, text_products, products_item_price }) => {
            const container = `
            <div class="block_products">  
                <div class="products">
                    <div class="products_item position_product_center">
                        <img class="products_item_photo" src="${products_item_photo}" alt="Product number one">
                        <div class="position_products_item_text">
                            <span class="products_item_title">${products_item_title}</span>
                            <p class="text_products">${text_products}</p>
                            <span class="products_item_price">$${products_item_price}</span>
                        </div>
                        <button class="products_item_btn button_basket">
                            <img class="position_basket_products" src="img/basket.svg" alt="" height="25" width="27">
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `
            containerBox.insertAdjacentHTML("beforeend", container);
        });
        const buttonEl = document.querySelectorAll('.button_basket');
        buttonEl.forEach((el) => {
            el.addEventListener('click', () => {
                const containerBasket = document.querySelector('.block_basket');
                data.forEach(({ products_item_photo, products_item_title, text_products, products_item_price }) => {
                    const container = `
                    <div class="block_products">  
                        <div class="products">
                            <div class="products_item position_product_center">
                                <img class="products_item_photo" src="${products_item_photo}" alt="Product number one">
                                <div class="position_products_item_text">
                                    <span class="products_item_title">${products_item_title}</span>
                                    <p class="text_products">${text_products}</p>
                                    <div class="dispflex">
                                    <span class="products_item_price">$${products_item_price}</span>
                                    <button class="button_vector products_item_title">Удалить товар</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    containerBasket.insertAdjacentHTML("beforeend", container);
                });
                // Удаление товаров
                const buttonDelEl = document.querySelectorAll('.button_vector');
                buttonDelEl.forEach((el) => {
                    el.addEventListener('click', () => {
                        const delProd = el.closest('.block_products');
                        delProd.remove();
                    });
                });
            });
        });
    } catch (error) {
        console.error(error);
    }
}
productData();