var KissManga = {
    mirrorName: "KissManga",
    canListFullMangas: false,
    mirrorIcon: "img/kissmanga.png",
    languages: "en",
    isMe: function (url) {
        // "use strict";
        return (url.indexOf("kissmanga.com") !== -1);
    },
    getMangaList: function (search, callback) {
        "use strict";
        $.ajax({
            url: "http://kissmanga.com/Search/Manga/" + search,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Pragma", "no-cache");
            },
            success: function (objResponse) {
                var div = document.createElement("div");
                div.innerHTML = objResponse.replace(/<img/gi, '<noload');
                var res = [];
                $(".listing td a", div).each(function (index) {
                    if(!$(this).attr("href").includes("?id=")){
                        res[res.length] = [$(this).text().trim(), "http://kissmanga.com"+$(this).attr("href")];
                    }
                });
                callback("KissManga", res);
            }
        });
    },
    getListChaps: function (urlManga, mangaName, obj, callback) {
        $.ajax({
            url: urlManga,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Pragma", "no-cache");
            },
            success: function (objResponse) {
                var div = document.createElement("div"),
                    res = [];
                div.innerHTML = objResponse.replace(/<img/gi, '<noload');
                $(".listing td a", div).each(function (index) {
                    res[res.length] = [$(this).text().trim(), "http://kissmanga.com"+$(this).attr("href")];
                });
                callback(res, obj);
            }
        });
    },
    getInformationsFromCurrentPage: function (doc, curUrl, callback) {
        "use strict";
        var name = $("title", doc).text();
        name = name.split("\n", 3).join("\n").substring(12).trim();
        var currentMangaURL = curUrl.split("/", 5).join("/");
        // var currentChapter = parseInt($(".selectChapter option:selected", doc)[0].textContent.trim().substring(3, 6)),
        var currentChapter = $(".selectChapter option:selected", doc)[0].textContent.trim(),
            currentChapterURL = window.location.href;
        callback({
            "name": name,
            "currentChapter": currentChapter.replace("- ",""),
            "currentMangaURL": currentMangaURL,
            "currentChapterURL": curUrl
        });
    },
    getListImages: function (doc, curUrl) {
        // "use strict";
        var res = [];
        // var last = $('.dropdown-menu:last li a:last', doc);
        // var npages = parseInt(last.text().replace(/[^0-9]/g, ''));
        // var baseUrl = last.attr('href').replace(/\/[^/]*$/g, '/');
        // while (npages > 0)
        // {
        //     res[npages - 1] = baseUrl + npages;
        //     npages--;
        // }
        return res;
    },
    removeBanners: function (doc, curUrl) {
        "use strict";
    },
    whereDoIWriteScans: function (doc, curUrl) {
        "use strict";
        return $(".scanAMR", doc);
    },
    whereDoIWriteNavigation: function (doc, curUrl) {
        "use strict";
        return $(".navAMR", doc);
    },
    isCurrentPageAChapterPage: function (doc, curUrl) {
        "use strict";
        return ($("#divImage", doc).size() > 0);
    },
    doSomethingBeforeWritingScans: function (doc, curUrl) {
        "use strict";
    },
    nextChapterUrl: function (select, doc, curUrl) {
        "use strict";
        if ($(select).children("option:selected").prev().size() !== 0) {
            return $(select).children("option:selected").prev().val();
        }
        return null;
    },
    previousChapterUrl: function (select, doc, curUrl) {
        "use strict";
        if ($(select).children("option:selected").next().size() !== 0) {
            return $(select).children("option:selected").next().val();
        }
        return null;
    },
    getImageFromPageAndWrite: function (urlImg, image, doc, curUrl) {
        "use strict";
    },
    isImageInOneCol: function (img, doc, curUrl) {
        "use strict";
        return false;
    },
    getMangaSelectFromPage: function (doc, curUrl) {
        "use strict";
        return null;
    },
    doAfterMangaLoaded: function (doc, curUrl) {
        "use strict";
    }
};

// Call registerMangaObject to be known by includer
if (typeof registerMangaObject == 'function') {
	registerMangaObject("KissManga", KissManga);
}
