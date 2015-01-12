'use strict';
playerApp.factory('translitService', ['$location', function ($location) {

    var translitServiceFactory = {};

    var _translit = function (rawString) {
        var space = '-';
        var translitString = '';
        var transl = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space,
            'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        if (rawString != '')
            rawString = rawString.toLowerCase();

        for (var i = 0; i < rawString.length; i++){
            if (/[а-яё]/.test(rawString.charAt(i))){ // заменяем символы на русском
                translitString += transl[rawString.charAt(i)];
            } else if (/[a-z0-9]/.test(rawString.charAt(i))){ // символы на анг. оставляем как есть
                translitString += rawString.charAt(i);
            } else {
                if (translitString.slice(-1) !== space) translitString += space; // прочие символы заменяем на space
            }
        }
        return translitString;
    };

    var _changeLink = function (compName) {
        var param = _translit(compName);
        $location.search('comp', param);
    };

    translitServiceFactory.changeLink = _changeLink;
    translitServiceFactory.translit = _translit;

    return translitServiceFactory;
}]);
