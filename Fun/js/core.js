Array.prototype.remove = function(el) {
    return this.splice(this.indexOf(el), 1);
}
const InstrumentEnum = Object.freeze({
    BONGO: 0,
    KEYBOARD: 1,
    MEOW: 3,
    CYMBAL: 4,
    MARIMBA: 5,
    TAMBOURINE: 6,
    COWBELL: 7
})
const KeyEnum = Object.freeze({
    "A": 1,
    "D": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 0,
    " ": 0,
    "C": 1,
    "Q": 1,
    "W": 2,
    "E": 3,
    "R": 4,
    "T": 5,
    "Y": 6,
    "Z": 6,
    "U": 7,
    "I": 8,
    "O": 9,
    "P": 0,
    "B": 1,
    "F": 1
})
const InstrumentPerKeyEnum = Object.freeze({
    "A": InstrumentEnum.BONGO,
    "D": InstrumentEnum.BONGO,
    "1": InstrumentEnum.KEYBOARD,
    "2": InstrumentEnum.KEYBOARD,
    "3": InstrumentEnum.KEYBOARD,
    "4": InstrumentEnum.KEYBOARD,
    "5": InstrumentEnum.KEYBOARD,
    "6": InstrumentEnum.KEYBOARD,
    "7": InstrumentEnum.KEYBOARD,
    "8": InstrumentEnum.KEYBOARD,
    "9": InstrumentEnum.KEYBOARD,
    "0": InstrumentEnum.KEYBOARD,
    " ": InstrumentEnum.MEOW,
    "C": InstrumentEnum.CYMBAL,
    "Q": InstrumentEnum.MARIMBA,
    "W": InstrumentEnum.MARIMBA,
    "E": InstrumentEnum.MARIMBA,
    "R": InstrumentEnum.MARIMBA,
    "T": InstrumentEnum.MARIMBA,
    "Y": InstrumentEnum.MARIMBA,
    "Z": InstrumentEnum.MARIMBA,
    "U": InstrumentEnum.MARIMBA,
    "I": InstrumentEnum.MARIMBA,
    "O": InstrumentEnum.MARIMBA,
    "P": InstrumentEnum.MARIMBA,
    "B": InstrumentEnum.TAMBOURINE,
    "F": InstrumentEnum.COWBELL
})
const ClickKeyEquivalentEnum = Object.freeze({
    "1": "A",
    "2": " ",
    "3": "D"
})
const TapKeyEquivalentEnum = Object.freeze({
    "tap-left": {
        "BONGO": ["A"]
    },
    "tap-right": {
        "BONGO": ["D"],
        "CYMBAL": ["C"],
        "TAMBOURINE": ["B"],
        "COWBELL": ["F"]
    },
    "tap-space": {
        "MEOW": [" "]
    },
    "tap-1": {
        "KEYBOARD": ["1"],
        "MARIMBA": ["Q"]
    },
    "tap-2": {
        "KEYBOARD": ["2"],
        "MARIMBA": ["W"]
    },
    "tap-3": {
        "KEYBOARD": ["3"],
        "MARIMBA": ["E"]
    },
    "tap-4": {
        "KEYBOARD": ["4"],
        "MARIMBA": ["R"]
    },
    "tap-5": {
        "KEYBOARD": ["5"],
        "MARIMBA": ["T"]
    },
    "tap-6": {
        "KEYBOARD": ["6"],
        "MARIMBA": ["Y", "Z"]
    },
    "tap-7": {
        "KEYBOARD": ["7"],
        "MARIMBA": ["U"]
    },
    "tap-8": {
        "KEYBOARD": ["8"],
        "MARIMBA": ["I"]
    },
    "tap-9": {
        "KEYBOARD": ["9"],
        "MARIMBA": ["O"]
    },
    "tap-0": {
        "KEYBOARD": ["0"],
        "MARIMBA": ["P"]
    }
})
const TapKeysPerLayerEnum = Object.freeze({
    "layer-bongo": ["tap-left", "tap-right"],
    "layer-keyboard": ["tap-keys"],
    "layer-meow": ["tap-space"],
    "layer-cymbal": ["tap-right"],
    "layer-marimba": ["tap-keys"],
    "layer-tambourine": ["tap-right"],
    "layer-cowbell": ["tap-right"]
})
const LayersPerInstrumentEnum = Object.freeze({
    "layer-bongo": InstrumentEnum.BONGO,
    "layer-keyboard": InstrumentEnum.KEYBOARD,
    "layer-meow": InstrumentEnum.MEOW,
    "layer-cymbal": InstrumentEnum.CYMBAL,
    "layer-marimba": InstrumentEnum.MARIMBA,
    "layer-tambourine": InstrumentEnum.TAMBOURINE,
    "layer-cowbell": InstrumentEnum.COWBELL
})
var pressed = [];
var currentLayer;
var allLayers = [];
for (var tapKeysPerInstrument of Object.values(TapKeysPerLayerEnum)) {
    allLayers.push(...tapKeysPerInstrument);
}
allLayers = [...new Set(allLayers)];
$(document).ready(function() {
    lowLag.init({
        'urlPrefix': '../sounds/',
        'debug': 'none'
    });
    $.load("bongo", 0, 1);
    $.load("keyboard", 0, 9);
    $.load("marimba", 0, 9);
    $.loadSimple("meow");
    $.loadSimple("cymbal");
    $.loadSimple("tambourine");
    $.loadSimple("cowbell");
    $.layers("layer-bongo");
    $("select#select-instrument").on("change", function() {
        $.layers($(this).val());
    });
    gtag('event', 'color_scheme', {
        'color_scheme': (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    });
});
$.loadSimple = function(file) {
    for (i = 0; i <= 1; i++) {
        lowLag.load([file + ".mp3", file + ".wav"], file + i);
    }
}
$.load = function(file, start, end) {
    for (i = start; i <= end; i++) {
        lowLag.load([file + i + ".mp3", file + i + ".wav"], file + i);
    }
}
$.wait = function(callback, ms) {
    return window.setTimeout(callback, ms);
}
$.play = function(instrument, key, state) {
    var instrumentName = Object.keys(InstrumentEnum).find(k=>InstrumentEnum[k] === instrument).toLowerCase();
    var commonKey = KeyEnum[key];
    if (commonKey !== undefined) {
        var id = "#" + (instrument == InstrumentEnum.MEOW ? "mouth" : "paw-" + ((instrument == InstrumentEnum.BONGO ? commonKey : commonKey <= 5 && commonKey != 0 ? 0 : 1) == 0 ? "left" : "right"));
        if (state == true) {
            if (jQuery.inArray(commonKey, pressed) !== -1) {
                return;
            }
            pressed.push(commonKey);
            if (instrument != InstrumentEnum.MEOW) {
                $(".instruments>div").each(function(index) {
                    $(this).css("visibility", ($(this).attr("id") === instrumentName) ? "visible" : "hidden");
                });
            }
            lowLag.play(instrumentName + commonKey);
            $.layers(Object.keys(LayersPerInstrumentEnum).find(k=>LayersPerInstrumentEnum[k] == instrument), true);
            gtag('event', 'sound_play', {
                'instrument': instrumentName,
                'key': key
            });
        } else {
            pressed.remove(commonKey);
        }
        $(id).css("background-position-x", (state ? "-800px" : "0"));
    }
}
$.layers = function(selectedLayer) {
    if (selectedLayer !== currentLayer) {
        currentLayer = selectedLayer;
        var layers = TapKeysPerLayerEnum[selectedLayer];
        if (layers != undefined) {
            for (var layer of allLayers) {
                $("#" + layer).css("display", layers.includes(layer) ? "inline-block" : "none");
            }
            var instrument = LayersPerInstrumentEnum[selectedLayer];
            var instrumentName = Object.keys(InstrumentEnum).find(k=>InstrumentEnum[k] === instrument).toLowerCase();
            if (instrument != InstrumentEnum.MEOW) {
                $(".instruments>div").each(function(index) {
                    $(this).css("visibility", ($(this).attr("id") === instrumentName) ? "visible" : "hidden");
                });
            }
        }
        var layerPerKey = Object.keys(LayersPerInstrumentEnum);
        for (var i = 0; i < layerPerKey.length; i++) {
            if (layerPerKey[i] === selectedLayer) {
                $("select#select-instrument>option:eq(" + i + ")").prop("selected", true);
            }
        }
    }
}
$(document).bind("contextmenu", function(e) {
    e.preventDefault();
});
$(document).on("mousedown mouseup", function(e) {
    if (!window.matchMedia("(pointer: coarse)").matches && !$(e.target).is("a, a *")) {
        var keyboardEquivalent = ClickKeyEquivalentEnum[e.which];
        if (keyboardEquivalent != undefined) {
            var instrument = InstrumentPerKeyEnum[keyboardEquivalent.toUpperCase()];
            var key = KeyEnum[keyboardEquivalent.toUpperCase()];
            if (instrument != undefined && key != undefined) {
                $.play(instrument, key, e.type === "mousedown");
            }
        }
    }
});
$(document).on("keydown keyup", function(e) {
    var instrument = InstrumentPerKeyEnum[e.key.toUpperCase()];
    if (instrument != undefined) {
        e.preventDefault();
        $.play(instrument, e.key.toUpperCase(), e.type === "keydown");
    }
});
$(document).on("touchstart touchend", function(e) {
    if (e.target.classList.contains("layer")) {
        if (e.type === "touchstart") {
            $(e.target).addClass("highlight");
            $.layers(e.target.id, true);
        } else {
            $(e.target).removeClass("highlight");
        }
    } else {
        var instrument = LayersPerInstrumentEnum[currentLayer];
        if (instrument != undefined) {
            var keys = TapKeyEquivalentEnum[e.target.id];
            if (keys != undefined) {
                var instrumentName = Object.keys(InstrumentEnum).find(k=>InstrumentEnum[k] === instrument);
                if (instrumentName != undefined && keys[instrumentName] != undefined) {
                    for (var key of keys[instrumentName]) {
                        if (key != undefined) {
                            if (e.type === "touchstart") {
                                $(e.target).addClass("highlight");
                            } else {
                                $(e.target).removeClass("highlight");
                            }
                            $.play(instrument, key, e.type === "touchstart");
                        }
                    }
                }
            }
        }
    }
});
var link_StrayRogue = "<a href=\"https://twitter.com/StrayRogue\" target=\"_blank\">@StrayRogue</a>";
var link_DitzyFlama = "<a href=\"https://twitter.com/DitzyFlama\" target=\"_blank\">@DitzyFlama</a>";
var link_yPolar = "<a href=\"https://ypolarwebsite.up.railway.app/\" target=\"_blank\">yPolar</a> (<a href=\"https://discord.com/users/502974588075114509\" target=\"_blank\">@yPolar</a>)";
var i18n_map = {
    "Bongo": {
        "en": "Bongo",
        "ca": "Bongo",
        "pt-br": "Bongô"
    },
    "Keyboard": {
        "en": "Keyboard",
        "ca": "Teclat",
        "pt-br": "Teclado"
    },
    "Meow": {
        "en": "Meow",
        "ca": "Miol",
        "pt-br": "Miau"
    },
    "Cymbal": {
        "en": "Cymbal",
        "ca": "Plat",
        "pt-br": "Prato"
    },
    "Marimba": {
        "en": "Marimba",
        "ca": "Marimba",
        "pt-br": "Marimba"
    },
    "Tambourine": {
        "en": "Tambourine",
        "ca": "Pandereta",
        "pt-br": "Pandeiro"
    },
    "Cowbell": {
        "en": "Cowbell",
        "ca": "Esquellot",
        "pt-br": "Carrilhão"
    },
    "SPACE": {
        "en": "SPACE",
        "ca": "ESPAI",
        "pt-br": "ESPAÇO"
    },
    "Piano": {
        "en": "Piano",
        "ca": "Piano",
        "pt-br": "Piano"
    },
    "LEFT": {
        "en": "LEFT",
        "ca": "ESQUERRA",
        "pt-br": "ESQUERDA"
    },
    "RIGHT": {
        "en": "RIGHT",
        "ca": "DRETA",
        "pt-br": "DIREITA"
    },
    "other-lang": {
        "en": "<a href=\"/?lang=ca\">En català</a>",
        "ca": "<a href=\"/?lang=en\">In English</a>",
        "pt-br": "<a href=\"/?lang=en\">Em inglês</a>"
    },
    "courtesy": {
        "en": "Art courtesy of " + link_StrayRogue,
        "ca": "Art per cortesia de " + link_StrayRogue,
        "pt-br": "Arte cortesia de " + link_StrayRogue
    },
    "meme": {
        "en": "Meme by " + link_DitzyFlama,
        "ca": "Meme de " + link_DitzyFlama,
        "pt-br": "Meme por " + link_DitzyFlama
    },
    "website": {
        "en": "Website by " + link_yPolar,
        "ca": "Lloc web d&#39" + link_yPolar,
        "pt-br": "Site por " + link_yPolar
    },
    "cookies": {
        "en": "This website uses cookies to analyze traffic via anonymized and aggregated data.",
        "ca": "Aquest lloc web utilitza galetes per analitzar el trànsit mitjançant dades agregades i anonimitzades.",
        "pt-br": "Este site usa cookies para analisar o tráfego por meio de dados anonimizados e agregados."
    }
};
var supportedLanguages = {
    "pt-br": true,
    "ca": true,
    "en": true
};
function preferredLang() {
    const urlParams = new URLSearchParams(window.location.search);
    var urlLang = urlParams.get("lang");
    if (urlLang !== null && supportedLanguages[urlLang]) {
        return urlLang;
    }
    var langs = window.navigator.languages;
    for (var i = 0; i < langs.length; i++) {
        var code = langs[i].substring(0, 2);
        var l = supportedLanguages[code];
        if (l) {
            return code;
        }
    }
    return "en";
}
;function internationalize() {
    var lang = preferredLang();
    $("[i18n]").each(function() {
        var id = $(this).attr("i18n");
        this.innerHTML = i18n_map[id][lang];
    });
    $("html").attr("lang", lang);
}
window.addEventListener("languagechange", internationalize);
document.addEventListener("DOMContentLoaded", internationalize)
