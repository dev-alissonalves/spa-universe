const wallPaper = document.querySelector("body");
const routes = {
  "/": "/pages/home/home.html",
  "/universo": "/pages/universo/universo.html",
  "/explorar": "/pages/explorar/explorar.html",
  404: "/pages/erro/404.html",
};

function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handle();
}

function handle() {
  
  const { pathname } = window.location;
  console.log(pathname);
  // pegando uma rota - o pathname inicial é o "/" caso ele não encontre mostra o 404
  const route = routes[pathname] || routes[404];
  changeBG(pathname);
  fetch(route)
    .then((data) => data.text())
    .then((html) => {
      document.querySelector("#app").innerHTML = html;
    });
}

function changeBG(pathname) {
  if (pathname == "/universo") {
    wallPaper.className = "universo";
  } else if (pathname == "/explorar") {
    wallPaper.className = "explorar";
  }else{
    wallPaper.className = "home";
  }
}

handle();
window.onpopstate = () => handle();
window.route = () => route();
