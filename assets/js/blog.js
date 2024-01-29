import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    db,
    getDownloadURL,
    ref,
    storage,
    uploadBytesResumable,
    app,
  } from "./firebase.js";


  

  var BlogArr = [];

  window.addEventListener("load", async function () {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(function (doc) {
      // console.log(doc.data().tilte);
      // console.log(doc.id);
      // BlogArr.push(doc.data());
      BlogArr.push({
        user: doc.data().user,  
        id:doc.data().id,
      title: doc.data().title,
      description: doc.data().description,
      uid: doc.data().uid,
      link: doc.data().link,
      image: doc.data().image,
      timestamp: doc.data().timestamp,
      blogId: doc.id,
      });
    });
    // console.log(blogId);
    BlogArr.map((item, index) => {
      console.log(item);
      let blogid = item.blogId;
      console.log(blogid);
      window.localStorage.setItem("blogId", blogid);
    
      let parent = document.getElementById("parent");
      parent.innerHTML += `
        <div key=${index} class="card col-lg-4">
            <div class="card__header">
              <img src=${item.image} alt="card__image" class="card__image img" width="600">
            </div>
            <div class="card__body">
              <span class="tag">News</span>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
            <button data-id=${blogid} class="read-more">Read More</button>
            <div class="card__footer">
              <div class="user">
                <img src="https://i.pravatar.cc/40" alt="user__image" class="user__image">
                <div class="user__info">
                  <h5>${item.user}</h5>
                  <small>${item.timestamp}</small>
                </div>
              </div>
            </div>
        </div>
      `;

    });
    window.localStorage.removeItem("newblogid");

    let readMoreButtons = parent.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
      button.onclick = function(event) {
        var id = event.target.dataset.id;
           // Use event.target.dataset.id to get the data-id attribute
        window.location.reload();
        localStorage.setItem("newblogid", id);
        // Call the function to handle the click event
        // let blogid = localStorage.getItem("blogid");
        window.location.href='./blog2.html';
        // handleReadMoreClick(blogid);
      };
    });

    
    


// let readMoreButtons = document.getElementsByClassName("read-more");
// let buttonsArray = Array.from(readMoreButtons);

// buttonsArray.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     let blogId = e.target.getAttribute("data-id");
//     this.localStorage.setItem('blogID' ,blogId );
//     console.log(blogId);
//   });
// });
// console.log(readMoreButton)

// console.log(readMoreButton)


    

    // console.log(BlogArr, "BlogArr");
  
    // for of loop
  
    for (var value of BlogArr) {
      // renderCardUI(title, desc, image, id)
          // parent.innerHTML += createUI(
          //   user.value, 
          //   title.value, 
          //   description.value, 
          //   // image, 
          //   link.value,
          //   docRef.id, 
          //   timestamp
          // );
        }
      }
    );


  

  //    ` 
  //         <div key=${id} class="col-lg-4">
  //   <a href=${item.link} target="_blank">
  //   <div class="card">
  //     <div class="card-image"><img src=${item.image} alt="" ></div>
  //     <p class="card-title">${item.title}</p>
  //     <p class="card-body">
  //       ${item.description}
  //     </p>
  //     <p class="footer">Written by <span class="by-name">${item.user}</span> on <span class="date">${item.timestamp}</span></p>
  //   </div>
  // </a>
  // </div>
  //       `





  

  function createUI(user,title,description,image,link,DocrefId,timestamp) {
    var length = description.length;
    timestamp = new Date().toLocaleString();
    // Unique ID for each card
    // console.log(unID);
    if(!image)
    {
      image="https://firebasestorage.googleapis.com/v0/b/my-first-project-1-c98da.appspot.com/o/images%2Fscreen-shot-2023-04-13-at-10-35-31-am.webp?alt=media&token=b014caf2-8194-4b96-b122-49c06b561240"
    }
    var UI = `<div class="col-lg-4">
    <a href=${link} target="_blank">
    <div class="card">
      <div class="card-image"><img src=${image} alt="" ></div>
      <p class="card-title">${title}</p>
      <p class="card-body">
        ${description}
      </p>
      <button data-id=${timestamp} class="read-more">Read More</button>
      <p class="footer">Written by <span class="by-name">${user}</span> on <span class="date">${timestamp}</span></p>
    </div>
  </a>
  </div>`;
  
    return UI;
    
  }
  
  window.createUI = createUI;



  