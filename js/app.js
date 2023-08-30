// const allNews = `https://openapi.programming-hero.com/api/news/categories`;

// const newsCategory = ` https://openapi.programming-hero.com/api/news/category/{category_id}`;

// const NewsDetail = `https://openapi.programming-hero.com/api/news/{news_id}`;

// const MissingData = ` https://openapi.programming-hero.com/api/news/2e78e5e0310c2e9adbb6efb1a263e745`;

const handleAllNews = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  const result = data.data.news_category;

  const tabContainer = document.getElementById("tabContainer");

  result.forEach((element) => {
    const { category_name, category_id } = element;

    const div = document.createElement("div");

    div.innerHTML = `
         <div class=" tabs justify-center flex">
            <a onclick="handleById('${element.category_id}')" class=" tab tab-bordered grid md:grid-cols-1"> ${category_name} </a> 
         </div>
    `;
    tabContainer.appendChild(div);
  });

  handleById((id = "05"));
};

const handleById = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const data = await res.json();
  let result = data.data;

  const noNews = document.getElementById("no-news");
  if (result.length === 0) {
    noNews.classList.remove("hidden");
  } else {
    noNews.classList.add("hidden");
  }

  const footerContainer = document.getElementById("footer-container");

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  result.forEach((category) => {
    const { title, details, author, total_view, image_url, _id } = category;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-side bg-white shadow-xl p-5 my-10 flex flex-col lg:flex-row">
                <figure><img src="${image_url}" alt="refuse-Shelter" border="0" class="lg:w-[650px]"></figure>
                <div class="card-body">
                    <h2 class="card-title">${title.slice(0, 40)}</h2>
                    <p>${details.slice(0, 180)} </p>
                    <div class="flex flex-col lg:flex-row justify-between items-center my-8">
                        <div class="flex items-center gap-5">
                            <div class="avatar">
                                <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="${
                                      author.img
                                    }" alt="refuse-Shelter" border="0">
                                </div>
                            </div>
                            <div>
                                <p> ${author.name} </p>
                                <p>${author.published_date} </p>
                            </div>
                        </div>
                        <div class="mt-4 nd:mt-0" >
                            <h4>Total view: ${total_view?total_view: "00"}</h4>
                        </div>
                        <div>
                            <div class="rating">
                                <input type="radio" name="rating-1" class="mask mask-star" />
                                <input type="radio" name="rating-1" class="mask mask-star" checked />
                                <input type="radio" name="rating-1" class="mask mask-star" />
                                <input type="radio" name="rating-1" class="mask mask-star" />
                                <input type="radio" name="rating-1" class="mask mask-star" />
                            </div>
                        </div>
                        <div class="card-actions justify-end">
                            <a onclick="handleDetails('${_id}')"><i class="fa-solid fa-arrow-right cursor-pointer mt-5 md:mt-0"></i></a>         
                        </div>
                    </div>
                </div>
            </div>
    `;
    cardContainer.appendChild(div);
    footerContainer.innerHTML = `
    <div class="footer footer-center p-4 bg-base-300 
    text-base-content">
    <p>Copyright © 2023 - All right reserved by portal news</p>
    </div>
    `;
  });
};

const handleDetails = async (newsId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsId}`
  );
  const data = await res.json();
  const news = data.data[0];
  const { author, title, details } = news;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.textContent = "";

  const div = document.createElement("div");
  div.innerHTML = `
    <dialog id="my_modal" class="modal">
    <form method="dialog" class="modal-box">
        <div class="card  ">
             
         <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details.slice(0, 7000)}</p>
        <br/>
        <p class="text-xl md:text-2xl">Published by: ${author.name}</p>
         </div>
     </div>
        <div class="modal-action">
        <button class="btn">Close</button>
        </div>
    </form>
    </dialog>
  `;
  modalContainer.appendChild(div);

  const modal = document.getElementById("my_modal");
  modal.showModal();
};

handleAllNews();
