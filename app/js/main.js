$(function () {
  new WOW().init();

  $(".slider__inner-box").slick({
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $(".rate-star").rateYo({
    starWidth: "15px",
    ratedFill: "#FF352B",
    rating: "80%",
    precision: 0,
  });

  $("#feedback__item-btn-1").click(function () {
    $(".feedback__item-content-1").toggleClass("active");
    if ($(".feedback__item-content-1").hasClass("active")) {
      $("#feedback__item-btn-1").html("Скрыть");
    } else {
      $("#feedback__item-btn-1").html("Читать полностью");
    }
    return false;
  });
  $("#feedback__item-btn-2").click(function () {
    $(".feedback__item-content-2").toggleClass("active");
    if ($(".feedback__item-content-2").hasClass("active")) {
      $("#feedback__item-btn-2").html("Скрыть");
    } else {
      $("#feedback__item-btn-2").html("Читать полностью");
    }
    return false;
  });
  $("#feedback__item-btn-3").click(function () {
    $(".feedback__item-content-3").toggleClass("active");
    if ($(".feedback__item-content-3").hasClass("active")) {
      $("#feedback__item-btn-3").html("Скрыть");
    } else {
      $("#feedback__item-btn-3").html("Читать полностью");
    }
    return false;
  });
});
