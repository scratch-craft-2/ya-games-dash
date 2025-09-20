(function (Scratch) {
    "use strict";
    class YaGamesSDKExtension {
      getInfo() {
        console.log(
          "Расширение Yandex Games TurboWarp созданно timaaos, scratch_craft_2, Den4ik-12 и DBDev",
        );
        return {
          id: "yagames",
          name: "Яндекс Игры SDK",
          color1: "#4C1CBA",
          blocks: [
            {
              opcode: "initsdk",
              blockType: Scratch.BlockType.COMMAND,
              text: "Загрузить YaGames SDK",
            },
            {
              opcode: "setdebug",
              blockType: Scratch.BlockType.COMMAND,
              text: "Включить дебаг режим",
            },
            {
              opcode: "reporterlang",
              blockType: Scratch.BlockType.REPORTER,
              text: "Язык на котором открыта игра",
            },
            {
              opcode: "setdata",
              blockType: Scratch.BlockType.COMMAND,
              text: "Сохранить прогресс пользователя| мгновенное сохранение: [FLASH] | Сохранение прогресса (вставьте json object): [DATA]",
              arguments: {
                FLASH: {
                  defaultValue: "false",
                  type: Scratch.ArgumentType.BOOLEAN,
                },
                DATA: {
                  defaultValue: "100",
                  type: Scratch.ArgumentType.OBJECT,
                },
              },
            },
            {
              opcode: "getdata",
              blockType: Scratch.BlockType.REPORTER,
              text: "Получить значение сохранения по ключу [KEY] (если не указано вернется все сохранение)" ,
              arguments: {
                 KEY: {
                  defaultValue: "Var1",
                  type: Scratch.ArgumentType.STRING,
                }            
              }
            {
              opcode: "sdkenabled",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "SDK загружен?",
            },
            {
              opcode: "loadID",
              blockType: Scratch.BlockType.REPORTER,
              text: "Загрузить очки игрока из лидерборда с именем [NAME]",
              arguments: {
                NAME: {
                    defaultValue: "Имя лидерборда",
                    type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              opcode: "alreadyLogin",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Вошёл ли игрок в аккаунт Яндекса?"
            },
            {
              opcode: "login",
              blockType: Scratch.BlockType.COMMAND,
              text: "Вызвать окно авторизации Яндекса",
            },
            {
              opcode: "leaderboard",
              blockType: Scratch.BlockType.COMMAND,
              text: "Установить очки игрока в лидерборде [NAME] в значение [SCORE]",
              arguments: {
                NAME: {
                  defaultValue: "Имя лидерборда",
                  type: Scratch.ArgumentType.STRING,
                },
                SCORE: {
                  defaultValue: "100",
                  type: Scratch.ArgumentType.NUMBER,
                },
              },
            },
            {
              opcode: "resetprogress",
              blockType: Scratch.BlockType.COMMAND,
              text: "Сброс прогреса",
            },
            {
              opcode: "showfullscreen",
              blockType: Scratch.BlockType.COMMAND,
              text: "Показать рекламу",
            },
            {
              opcode: "whenFullscreenClosed",
              blockType: Scratch.BlockType.HAT,
              func: "isFullscreenClosed",
              text: "При закрытии рекламы",
            },
            {
              opcode: "fullscreenClosed",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Закрыта ли реклама?",
            },
            {
              opcode: "showrewarded",
              blockType: Scratch.BlockType.COMMAND,
              text: "Показать рекламу с вознаграждением",
            },
            {
              opcode: "whenRewardedWatched",
              blockType: Scratch.BlockType.HAT,
              func: "isRewardedWatched",
              text: "При показе рекламы с вознаграждением",
            },
            {
              opcode: "rewardedRewarded",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Вознаграждение за рекламу получено?",
            },
            {
              opcode: "canRateGame",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Можно оценить игру?",
            },
            {
              opcode: "openRatePopup",
              blockType: Scratch.BlockType.COMMAND,
              text: "Откройте всплывающее окно рейтинга",
            },
            {
              opcode: "getDeviceType",
              blockType: Scratch.BlockType.REPORTER,
              text: "Тип устройства",
            },
            {
              opcode: "isDesktop",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Игра открыта на десктопе?",
            },
            {
              opcode: "isMobile",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Игра открыта на телефоне?",
            },
            {
              opcode: "isTablet",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Игра открыта на планшете?",
            },
            {
              opcode: "isTV",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Игра открыта на телевизоре?",
            },
          ],
        };
      }
      getDeviceType() {
        if (window.ysdkdebug == true) {
          return "desktop";
        }
        return ysdk.deviceInfo.type;
      }
      isDesktop() {
        if (window.ysdkdebug == true) {
          return true;
        }
        return ysdk.deviceInfo.isDesktop();
      }
      isMobile() {
        if (window.ysdkdebug == true) {
          return false;
        }
        return ysdk.deviceInfo.isMobile();
      }
      isTablet() {
        if (window.ysdkdebug == true) {
          return false;
        }
        return ysdk.deviceInfo.isTablet();
      }
      reporterlang() {
        if (window.ysdkdebug == true) {
          return "ru";
        }
        return ysdk.environment.i18n.lang;
      }
      isTV() {
        if (window.ysdkdebug == true) {
          return false;
        }
        return ysdk.deviceInfo.isTV();
      }
      canRateGame() {
        if (window.ysdkdebug == true) {
          return !(window.alreadyrated == true);
        }
        var can;
        ysdk.feedback.canReview().then(({ value, reason }) => {
          can = value;
        });
        return can;
      }
      openRatePopup() {
        if (window.ysdkdebug == true) {
          window.alreadyrated = true;
          alert("ДЕБАГ Оцените нашу игру");
          return;
        }
        ysdk.feedback.requestReview();
      }
      whenRewardedWatched() {
        console.log("Просмотрено!");
      }
      rewardedRewarded() {
        return window.isrewarded == true;
      }
      triggerIRW() {
        window.triggerIRW = true;
      }
      triggerIFC() {
        this.undeafAE();
        window.triggerIFC = true;
      }
      isRewardedWatched() {
        if (window.triggerIRW) {
          window.triggerIRW = false;
          return true;
        }
        return false;
      }
      isFullscreenClosed() {
        if (window.triggerIFC) {
          window.triggerIFC = false;
          return true;
        }
        return false;
      }
      fullscreenClosed() {
        return window.isfullscreenclosed == true;
      }
      async loadID(args) {
      if (window.ysdkdebug != true) {
        const lb = await ysdk.getLeaderboards();
        try {
          const res = await lb.getLeaderboardPlayerEntry(args.NAME);
          console.log(res);
          return res.score;
        } catch (err) {
          if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
            console.log(err)
            return null;
          }
        }
      } else {
        return "Работает только в Яндексе";
      }
      }
      async alreadyLogin() {
      if (window.ysdkdebug != true) {
        try {
          const player = await ysdk.getPlayer();
          if (player.getMode() === 'lite') {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          console.error('Ошибка при получении игрока: ', err);
          return false;
        }
      } else {
        return true;
      }
      }
      login() {
      if (window.ysdkdebug != true) {
        var player;
        function initPlayer() {
          return ysdk.getPlayer().then(_player => {
                  player = _player;
                  return player;
              });
        }
        initPlayer().then(_player => {
          ysdk.auth.openAuthDialog().then(() => {
            console.log("Успешно авторизовано")
            initPlayer().catch(err => {
              console.log(err)
            });
          }).catch(() => {});
        }).catch(err => {
          console.log(err)
        });
      } else {
        alert("ДЕБАГ Войдите в аккаунт")
      }
      }
      initsdk() {
        function onBlur() {
          if (window.isAdOpened == false) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
          }
        }
        function onFocus() {
          if (window.isAdOpened == false) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          }
        }
        window.onfocus = onFocus;
        window.onblur = onBlur;
        window.isAdOpened = false;
        document.addEventListener(
          "visibilitychange",
          function () {
            if (window.isAdOpened == false) {
              if (document.hidden) {
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
              } else {
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
              }
            }
          },
          false,
        );
        window.savedData = "";
        if (window.ysdkdebug == true) {
          window.ysdk = {};
          window.ysdkplayer = {};
          return;
        }
        var script = document.createElement("script");
        script.src = "/sdk.js";
        document.head.appendChild(script);
        script.onload = async function () {
          console.log(YaGames);
          await YaGames.init().then((ysdk) => {
            window.ysdk = ysdk;
            ysdk.features.LoadingAPI.ready();
            ysdk
              .getPlayer({ scopes: false })
              .then((_player) => {
                var player = _player;
                window.ysdkplayer = player;
                console.log(window.ysdkplayer);
              })
              .catch((err) => {});
          });
          console.log("Инициализировано YaGames!");
        };
      }
      async loadvars() {
        if (window.ysdkdebug != true) {
          if (window.ysdkplayer != undefined) {
            var data = await window.ysdkplayer.getData();
            window.ysdkdata = data;
            console.log("Succesfully loaded data!");
          }
        } else {
          window.ysdkdata = {};
        }
      }
      setdebug() {
        window.alreadyrated = false;
        window.ysdkdebug = true;
      }
      async leaderboard(args) {
      if (window.ysdk != true) {
        await ysdk.getLeaderboards()
          .then(lb => {
            lb.setLeaderboardScore(args.NAME, args.SCORE);
            console.log("Сохранены данные в лидерборд")
          });
      }
      }
      sdkenabled() {
        return window.ysdk != undefined;
      }
      dataloaded() {
        return window.ysdkplayer != undefined && window.ysdkdata != undefined;
      }
      deafAE() {
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
      }
      undeafAE() {
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
      }
      showfullscreen() {
        window.isfullscreenclosed = false;
        window.isAdOpened = true;
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        if (window.ysdkdebug == true) {
          alert("Показ рекламы");
          window.isfullscreenclosed = true;
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          window.triggerIFC = true;
          window.isAdOpened = false;
          return;
        }
        if (window.ysdk != undefined) {
          window.ysdk.adv.showFullscreenAdv({
            callbacks: {
              onClose: function (wasShown) {
                window.isfullscreenclosed = true;
                window.triggerIFC = true;
                window.isAdOpened = false;
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
              },
              onError: function (error) {
                window.isfullscreenclosed = false;
                window.triggerIFC = true;
                window.isAdOpened = false;
              },
            },
          });
        }
      }
      showrewarded() {
        window.isrewardedwatched = false;
        window.isrewarded = false;
        window.isAdOpened = true;
        this.deafAE();
        if (window.ysdkdebug == true) {
          var pr = prompt(
            "DEBUG Rewarded Ad! Write C to close it, write R to get trigger reward.",
          );
          if (pr.toLowerCase() == "c") {
            window.isrewardedwatched = true;
            window.isrewarded = false;
          } else if (pr.toLowerCase() == "r") {
            window.isrewardedwatched = true;
            window.isrewarded = true;
          }
          window.isAdOpened = false;
          this.triggerIRW();
          return;
        }

setdata() {
function initPlayer() {
    return ysdk.getPlayer().then(_player => {
            return _player;
        });
}

initPlayer().then(_player => {
        if (_player.isAuthorized() === false) {
            console.log("Игрок не авторизован")
                    };
        
        if (_player.isAuthorized() === true) {
_player.setData(
    {[args.DATA]},
    [args.FLASH]
).then(() => {
    console.log('data is set');
})}
}}

getdata(){
ysdk.getPlayer().then(_player => {
return _player.getData([args.KEY]) }
}


        window.ysdk.adv.showRewardedVideo({
          callbacks: {
            onOpen: () => {
              window.isrewardedwatched = false;
              window.isrewarded = false;
            },
            onRewarded: () => {
              window.isrewarded = true;
              window.isAdOpened = false;
              this.triggerIRW();
            },
            onClose: () => {
              window.isrewardedwatched = true;
              window.isAdOpened = false;
              this.undeafAE();
              this.triggerIRW();
            },
            onError: (e) => {
              window.isrewardedwatched = false;
              window.isrewarded = false;
              window.isAdOpened = false;
            },
          },
        });
      }
    }
    Scratch.extensions.register(new YaGamesSDKExtension());
  })(Scratch);


