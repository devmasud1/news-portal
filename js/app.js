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

  handleById((id = "08"));
};

const handleById = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const data = await res.json();
  const result = data.data;

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  result.forEach((category) => {
    console.log(category);
    const { author, total_view, image_url } = category;

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-side bg-white shadow-xl p-5 my-5">
                <figure><img src="${image_url}" alt="refuse-Shelter" border="0"></figure>
                <div class="card-body">
                    <h2 class="card-title">The best fashion influencers to follow for sartorial inspiration</h2>
                    <p>From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers,
                        read on some of the best fashion blogs out there, and for even more inspiration, do head to our
                        separate black fashion influencer round-up.
                    </p>
                    <p>
                        Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday,
                        Missoma Black Friday and Gucci Black Friday...
                    </p>
                    <div class="flex justify-between items-center my-8">
                        <div class="flex items-center gap-5">
                            <div class="avatar">
                                <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="${author.img}" alt="refuse-Shelter" border="0">
                                </div>
                            </div>
                            <div>
                                <p> ${author.name} </p>
                                <p>${author.published_date} </p>
                            </div>
                        </div>
                        <div>
                            <h4>${total_view}M</h4>
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
                            <a><i class="fa-solid fa-arrow-right"></i></a>         
                        </div>
                    </div>
                </div>
            </div>
    `;
    cardContainer.appendChild(div);
  });
};

handleAllNews();
