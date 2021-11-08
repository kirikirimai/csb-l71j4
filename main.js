$(window).on("pageshow", function () {
  var flg = window.performance.navigation.type;
  console.log(flg);
  if (flg === 2) {
    console.log("ブラウザバックしてきた");
    check = true;
    //ナビ
    var data = window.sessionStorage.getItem("navState");
    data = JSON.parse(data);
    console.log(data);
    $.each(data, function (index, val) {
      var target = "#" + val;
      if (!$(target).hasClass("on")) {
        $(target).addClass("on");
      }
    });

    //フッター
    var data_footer = window.sessionStorage.getItem("footerState");
    data_footer = JSON.parse(data_footer);
    console.log(data_footer);
    $.each(data_footer, function (index, val) {
      var t_footer = "#" + val;
      if ($(t_footer).hasClass("on2")) {
        $(t_footer).removeClass("on2");
        $(t_footer).next().slideToggle();
      }
    });

    //タブ
    if ($("#products").length > 0) {
      console.log("商品ページでブラウザバックの場合");
      if (window.sessionStorage.getItem("tabState")) {
        var data_tab = window.sessionStorage.getItem("tabState");
        data_tab = JSON.parse(data_tab);

        $(".one_tab a").removeClass("current");
        $(".tab_main").removeClass("is_show");

        $("[href='" + data_tab + "']").addClass("current");
        $(data_tab).addClass("is_show");
      }
    }
  } else if (flg === 255) {
    //ブラウザバック以外は削除
    sessionStorage.removeItem("tabState");
    sessionStorage.removeItem("navState");
    sessionStorage.removeItem("footerState");
  }
});

$(function () {
  var currentNavList = [];
  var footerNavList = [];

  $(".btn").on("click", function () {
    var target = $(this).parents(".target");
    $(target).toggleClass("on");

    if ($(target).hasClass("on")) {
      var nav_id = $(target).attr("id");
      currentNavList.push(nav_id);
      sessionStorage.setItem("navState", JSON.stringify(currentNavList));
      console.log(currentNavList);
    } else {
      var nav_id = $(target).attr("id");
      var index = currentNavList.indexOf(nav_id);
      var remove_nav = currentNavList.splice(index, 1);
      console.log("削除：" + remove_nav);
      sessionStorage.setItem("navState", JSON.stringify(currentNavList));
      console.log(sessionStorage);
    }
  });

  // ft
  var width = $(window).width();
  var idx = 0;
  if (width <= 768) {
    $(".navilist li h4").on("click", function () {
      $(this).next().slideToggle();
      $(this).on(".navilist li h4").toggleClass("on2");
      if (!$(target).hasClass("on2")) {
        var nav_id = $(target).attr("id");
        footerNavList.push(nav_id);
        sessionStorage.setItem("footerState", JSON.stringify(footerNavList));
        console.log(footerNavList);
      } else {
        var nav_id = $(target).attr("id");
        var index = footerNavList.indexOf(nav_id);
        var remove_nav = footerNavList.splice(index, 1);
        console.log("削除：" + remove_nav);
        sessionStorage.setItem("footerState", JSON.stringify(footerNavList));
        console.log(sessionStorage);
      }
    });
  }

  $(".navilist li h5").on("click", function () {
    $(this).next().slideToggle();
    $(this).on(".navilist li h5").toggleClass("on2");
    if (!$(this).hasClass("on2")) {
      var nav_id = $(this).attr("id");
      footerNavList.push(nav_id);
      sessionStorage.setItem("footerState", JSON.stringify(footerNavList));
      console.log(footerNavList);
    } else {
      var nav_id = $(this).attr("id");
      var index = footerNavList.indexOf(nav_id);
      var remove_nav = footerNavList.splice(index, 1);
      console.log("削除：" + remove_nav);
      sessionStorage.setItem("footerState", JSON.stringify(footerNavList));
      console.log(sessionStorage);
    }
  });

  /* タブ切り替え */
  $(".one_tab a").on("click", function () {
    if ($(this).hasClass("current")) return;

    $(".one_tab a").removeClass("current");
    $(".tab_main").removeClass("is_show");

    var tab = $(this).attr("href");
    $(tab).addClass("is_show");
    $(this).addClass("current");

    if (tab === "#tab02") {
      sessionStorage.setItem("tabState", JSON.stringify(tab));
      console.log(sessionStorage);
    } else {
      sessionStorage.removeItem("tabState");
      console.log(sessionStorage);
    }

    return false;
  });
});
