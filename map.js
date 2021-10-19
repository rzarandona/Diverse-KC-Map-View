var map = L.map("map-container").setView(
  [53.18087583784217, -0.16225021397516728],
  13
);

var sidebar = L.control.sidebar("sidebar", {
  position: "left",
});
map.addControl(sidebar);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let markers = [
  {
    lat: 41.38727256585093,
    lang: -73.43984625597798,
    heading: "Danbury",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempore non possimus magnam saepe natus exercitationem corrupti asperiores officiis, libero suscipit in dolorem repellat reprehenderit, praesentium laborum ex vero porro.",
  },
  {
    lat: 41.29618333064061,
    lang: -73.48452420184435,
    heading: "Somewhere around Ridgefield",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempore non possim.",
  },
];

map.setView([52.43968649798061, 0.7306626310466454], 5);

let data = fetch("https://j7h5ygklx5.onrocket.site/wp-json/programs/get")
  .then((response) => response.json())
  .then((mapdata) => {
    console.log(mapdata);
    mapdata.forEach((marker) => {
      L.marker([marker.latitude, marker.longitude])
        .addTo(map)
        .on("click", () => {
          sidebar.hide();
          setTimeout(() => {
            jQuery(".title").text(marker.title);
            jQuery(".continent").text(marker.continent);
            jQuery(".short-description").text(marker.short_description);
            jQuery(".body-content").text(marker.body_content);
            jQuery(".short-description").text(marker.short_description);
            jQuery(".links-and-resources").html(marker.links_and_resources);
            jQuery(".featured-image ").css(
              "background-image",
              "url(" + marker.featured_image + ")"
            );
            sidebar.show();
          }, 500);
        });
    });
  });
