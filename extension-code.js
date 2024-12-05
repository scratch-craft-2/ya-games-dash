(function (Scratch) {
  'use strict';
  class YaGamesSDKExtension {
    getInfo() {
      console.log("Расширение Yandex games turbowarp созданно timaaos и scratch_craft_2 полный исходник используемого расширения: https://github.com/scratch-craft-2/ya-games-turbowarp/");
      return {
        id: 'yagames',
        name: 'Yandex Games SDK',
        color1: '#4C1CBA',
        blocks: [
          {
            opcode: 'initsdk',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Initialize YaGames SDK'
          },
          {
            opcode: 'setdebug',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Enable debug mode'
          },
          {
            opcode: 'getsavedvar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get saved variable [NAME] default value [DEFVAL]',
            arguments: {
              NAME: {
                defaultValue: 'money',
                type: Scratch.ArgumentType.STRING
              },
              DEFVAL: {
                defaultValue: '100',
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'setsavedvar',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set saved variable [NAME] value [VALUE]',
            arguments: {
              NAME: {
                defaultValue: 'money',
                type: Scratch.ArgumentType.STRING
              },
              VALUE: {
                defaultValue: '100',
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'sdkenabled',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is SDK Enabled'
          },
          {
            opcode: 'dataloaded',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is data loaded?'
          },
          {
            opcode: 'savevars',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Save progress'
          },
          {
            opcode: 'loadvars',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Load progress'
          },
          {
            opcode: 'resetprogress',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Reset progress'
          },
          {
            opcode: 'showfullscreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show fullscreen ad'
          },
          {
            opcode: 'whenFullscreenClosed',
            blockType: Scratch.BlockType.HAT,
            func: 'isFullscreenClosed',
            text: 'When fullscreen ad closed'
          },
          {
            opcode: 'fullscreenClosed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is fullscreen ad closed?'
          },
          {
            opcode: 'showrewarded',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show rewarded ad'
          },
          {
            opcode: 'whenRewardedWatched',
            blockType: Scratch.BlockType.HAT,
            func: 'isRewardedWatched',
            text: 'When rewarded ad shown'
          },
          {
            opcode: 'rewardedRewarded',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Did Rewarded Ad give reward?'
          },
          {
            opcode: 'canRateGame',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Can rate game?'
          },
          {
            opcode: 'openRatePopup',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Open Rating Popup'
          },
          {
            opcode: 'getDeviceType',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Device Type'
          },
          {
            opcode: 'isDesktop',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is playing on Desktop?'
          },
          {
            opcode: 'isMobile',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is playing on Mobile?'
          },
          {
            opcode: 'isTablet',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is playing on Tablet?'
          },
          {
            opcode: 'isTV',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is playing on TV?'
          },
        ]
      };
    }
    getDeviceType() {
      if (window.ysdkdebug == true) {
        return 'desktop';
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
        alert('DEBUG Rate our game');
        return;
      }
      ysdk.feedback.requestReview();
    }
    whenRewardedWatched() {
      console.log("wathced!");
    }
    rewardedRewarded() {
      return (window.isrewarded == true);
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
      return (window.isfullscreenclosed == true);
    }
        initsdk() {
      function onBlur() {
        if(window.isAdOpened == false){
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        }
      };
      function onFocus(){
        if(window.isAdOpened == false){
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        }
      };
      window.onfocus = onFocus;
      window.onblur = onBlur;
      window.isAdOpened = false;
      document.addEventListener('visibilitychange', function () {
        if(window.isAdOpened == false){
          if (document.hidden) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
          } else {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          }
        }
      }, false);
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
        await YaGames.init().then(ysdk => {
          window.ysdk = ysdk;
          ysdk.features.LoadingAPI.ready();
          ysdk.getPlayer({scopes: false}).then(_player => {
            var player = _player;
            window.ysdkplayer = player;
            console.log(window.ysdkplayer);
          }).catch((err) => {

          });
        });
        console.log("Инициализировано YaGames!");
      }
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
    setsavedvar(args) {
      window.ysdkdata[args.NAME] = args.VALUE;
      return;
    }
    getsavedvar(args) {
      return window.ysdkdata[args.NAME] || args.DEFVAL;
    }
    savevars() {
      if (window.ysdkplayer != undefined && window.ysdkdata != undefined && window.savedData !== JSON.stringify(window.ysdkdata))
        window.ysdkplayer.setData(window.ysdkdata, true).then(() => {
          window.savedData = JSON.stringify(window.ysdkdata);
          console.log("Successfully saved data!");
        });
    }
    resetprogress() {
      window.ysdkdata = {};
      if (window.ysdkplayer != undefined && window.ysdkdata != undefined && window.savedData !== JSON.stringify(window.ysdkdata))
        window.ysdkplayer.setData(window.ysdkdata, true).then(() => {
          window.savedData = JSON.stringify(window.ysdkdata);
          console.log("Successfully saved data!");
        });
    }
    sdkenabled() {
      return (window.ysdk != undefined);
    }
    dataloaded() {
      return ((window.ysdkplayer != undefined) && window.ysdkdata != undefined);
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
        alert("Fullscreen ad!");
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
            }
          }
        })
      }
    }
    showrewarded() {
      window.isrewardedwatched = false;
      window.isrewarded = false;
      window.isAdOpened = true;
      this.deafAE();
      if (window.ysdkdebug == true) {
        var pr = prompt('DEBUG Rewarded Ad! Write C to close it, write R to get trigger reward.');
        if (pr.toLowerCase() == 'c') {
          window.isrewardedwatched = true;
          window.isrewarded = false;
        } else if (pr.toLowerCase() == 'r') {
          window.isrewardedwatched = true;
          window.isrewarded = true;
        }
        window.isAdOpened = false;
        this.triggerIRW();
        return;
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
          }
        }
      });
    }
  }
  Scratch.extensions.register(new YaGamesSDKExtension());
})(Scratch);
