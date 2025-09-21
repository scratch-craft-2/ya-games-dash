(function (Scratch) {
    "use strict";
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error(
        "Yandex Games SDK:\nThis extension must run unsandboxed!\nPlease enable the unsandboxed mode when loading the extension."
      );
    }
  
    class YaGamesSDKExtension {
      constructor() {
        console.log(
          "Yandex Games SDK:\nThis extension created by timaaos, scratch_craft_2, Den4ik-12 and DBDev",
        );
        this.debug = false;
        this.alreadyRated = false;
        this.logged = false;
        this.isAdOpened = false;
      }
      getInfo() {
        return {
          id: "yagames",
          name: "Yandex Games SDK",
          color1: "#4C1CBA",
          blocks: [
            {
              opcode: "initsdk",
              blockType: Scratch.BlockType.COMMAND,
              text: "initialize SDK",
            },
            {
              opcode: "setdebug",
              blockType: Scratch.BlockType.COMMAND,
              text: "enable debug mode",
            },
            {
              opcode: "sdkenabled",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "SDK initialized?",
            },
            "---",
            {
              opcode: "reporterlang",
              blockType: Scratch.BlockType.REPORTER,
              text: "game language",
            },
            {
              opcode: "getservertime",
              blockType: Scratch.BlockType.REPORTER,
              text: "server time",
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'Saving progress'
            },
            {
              opcode: "setdata",
              blockType: Scratch.BlockType.COMMAND,
              text: "save user progress: [DATA] with instant saving [FLASH]",
              arguments: {
                FLASH: {
                  type: Scratch.ArgumentType.BOOLEAN,
                },
                DATA: {
                  defaultValue: '{"key": "value"}',
                  type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              opcode: "getdata",
              blockType: Scratch.BlockType.REPORTER,
              text: "item of key [KEY] in save (no key = all save)" ,
              arguments: {
                 KEY: {
                  defaultValue: "key",
                  type: Scratch.ArgumentType.STRING,
                }            
              }
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'leaderboards'
            },
            {
              opcode: "leaderboard",
              blockType: Scratch.BlockType.COMMAND,
              text: "set user score [SCORE] in leaderboard with name [NAME]",
              arguments: {
                NAME: {
                  defaultValue: "leaderboard",
                  type: Scratch.ArgumentType.STRING,
                },
                SCORE: {
                  defaultValue: "100",
                  type: Scratch.ArgumentType.NUMBER,
                },
              },
            },
            {
              opcode: "loadID",
              blockType: Scratch.BlockType.REPORTER,
              text: "user score from leaderboard with name [NAME]",
              arguments: {
                NAME: {
                    defaultValue: "leaderboard",
                    type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              opcode: "Getliaders",
              blockType: Scratch.BlockType.REPORTER,
              text: "leaders of leaderbord with name: [NAME] number of leaders around user (1-10): [AROUND] number of top leaders (1-20): [TOP]",
              arguments: {
                NAME: {
                    defaultValue: "leaderboard",
                    type: Scratch.ArgumentType.STRING,
                },
                AROUND: {
                    defaultValue: "5",
                    type: Scratch.ArgumentType.NUMBER,
                },
                TOP: {
                    defaultValue: "5",
                    type: Scratch.ArgumentType.NUMBER,
                },
              },
            },
            {
              opcode: "resetprogress",
              blockType: Scratch.BlockType.COMMAND,
              text: "reset progress",
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'login'
            },
            {
              opcode: "alreadyLogin",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "user logged into Yandex account?"
            },
            {
              opcode: "login",
              blockType: Scratch.BlockType.COMMAND,
              text: "show authorization window",
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'advertisement'
            },
            {
              opcode: "showfullscreen",
              blockType: Scratch.BlockType.COMMAND,
              text: "show ad",
            },
            {
              opcode: "whenFullscreenClosed",
              blockType: Scratch.BlockType.HAT,
              func: "isFullscreenClosed",
              text: "when ad closed",
            },
            {
              opcode: "fullscreenClosed",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "ad closed?",
            },
            {
              opcode: "showrewarded",
              blockType: Scratch.BlockType.COMMAND,
              text: "show reward ad",
            },
            {
              opcode: "whenRewardedWatched",
              blockType: Scratch.BlockType.HAT,
              func: "isRewardedWatched",
              text: "when reward for ad to be received",
            },
            {
              opcode: "rewardedRewarded",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "reward for ad to be received?",
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'rate game'
            },
            {
              opcode: "canRateGame",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "can rate game?",
            },
            {
              opcode: "openRatePopup",
              blockType: Scratch.BlockType.COMMAND,
              text: "show rate popup",
            },
            "---",
           {
                blockType: Scratch.BlockType.LABEL,
                text: 'device type'
            },
            {
              opcode: "getDeviceType",
              blockType: Scratch.BlockType.REPORTER,
              text: "device type",
            },
            {
              opcode: "isDesktop",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "device type = desktop?",
            },
            {
              opcode: "isMobile",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "device type = mobile?",
            },
            {
              opcode: "isTablet",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "device type = tablet?",
            },
            {
              opcode: "isTV",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "device type = TV?",
            },
          ],
        };
      }
      getservertime() {
        if (!this.ysdk) return "";
        return this.ysdk.serverTime();
      }
      getDeviceType() {
        if (this.debug) return "desktop";
        if (!this.ysdk) return "";
        return this.ysdk.deviceInfo.type;
      }
      isDesktop() {
        if (this.debug) return true;
        if (!this.ysdk) return false;
        return this.ysdk.deviceInfo.isDesktop();
      }
      isMobile() {
        if (this.debug) return false;
        if (!this.ysdk) return false;
        return this.ysdk.deviceInfo.isMobile();
      }
      isTablet() {
        if (this.debug) return false;
        if (!this.ysdk) return false;
        return this.ysdk.deviceInfo.isTablet();
      }
      reporterlang() {
        if (this.debug) return "en";
        if (!this.ysdk) return "";
        return this.ysdk.environment.i18n.lang;
      }
      isTV() {
        if (this.debug) return false;
        if (!this.ysdk) return false;
        return this.ysdk.deviceInfo.isTV();
      }
      canRateGame() {
        if (this.debug) return !this.alreadyRated;
        if (!this.ysdk) return false;
        var can;
        this.ysdk.feedback.canReview().then(({ value, reason }) => {
          can = value;
        });
        return can;
      }
      openRatePopup() {
        if (this.debug) {
          this.alreadyRated = true;
          alert("Debug mode: Rate our game");
          return;
        }
        if (!this.ysdk) return;
        this.ysdk.feedback.requestReview();
      }
      whenRewardedWatched() {
        console.log("Yandex Games SDK:\nReward ad watched!");
      }
      Getliaders(args) {
        if (!this.ysdk) return "";
        const name = Scratch.Cast.toString(args.NAME);
        const top = Scratch.Cast.toNumber(args.TOP);
        const around = Scratch.Cast.toNumber(args.AROUND);
        return this.ysdk.leaderboards.getEntries(name, { quantityTop: top, includeUser: true, quantityAround: around});
      }

      // Rewrite -->
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
        if (this.debug) return "";
        if (!this.ysdk) return "";
        const name = Scratch.Cast.toString(args.NAME);
        const lb = await this.ysdk.getLeaderboards();
        try {
          const res = await lb.getLeaderboardPlayerEntry(name);
          console.log(res);
          return res.score;
        } catch (err) {
          if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
            console.error("Yandex Games SDK:\nUser score getting error: ", err);
            return "";
          }
        }
      }
      async alreadyLogin() {
        if (this.debug) return this.logged;
        if (!this.ysdk) return false;
        try {
          const player = await this.ysdk.getPlayer();
          return player.getMode() == "lite";
        } catch (err) {
          console.error("Yandex Games SDK:\nUser logged into account getting error: ", err);
          return false;
        }
      }
      login() {
        if (this.debug) {
          this.logged = confirm("Debug mode: Login in account");
          return;
        }
        if (!this.ysdk) return;
        function initPlayer() {
          return this.ysdk.getPlayer().then(player => {
            return player;
          });
        }
        initPlayer().then(() => {
          this.ysdk.auth.openAuthDialog().then(() => {
            console.log("Yandex Games SDK:\nSuccessfully authorized!");
          }).catch(() => {});
        }).catch(err => {
          console.error("Yandex Games SDK:\nShowing authorization window error: ", err);
        });
      }
      initsdk() {
        window.onfocus = () => {
          if (!this.isAdOpened) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          }
        };
        window.onblur = () => {
          if (!this.isAdOpened) {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
          }
        };
        document.addEventListener(
          "visibilitychange",
          function () {
            if (!this.isAdOpened) {
              if (document.hidden) {
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
              } else {
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
              }
            }
          },
          false,
        );
        if (this.debug) return;
        var script = document.createElement("script");
        script.src = "/sdk.js";
        document.head.appendChild(script);
        script.onload = async function () {
          console.log(YaGames);
          await YaGames.init().then((ysdk) => {
            this.ysdk = ysdk;
            ysdk.features.LoadingAPI.ready();
            ysdk
              .getPlayer({ scopes: false })
              .then((player) => {
                this.ysdkplayer = player;
                console.log(this.ysdkplayer);
              })
              .catch(() => {});
          });
          console.log("Yandex Games SDK:\nInitialized!");
        };
      }
      async loadvars() {
        if (this.debug) {
          this.ysdkdata = {};
        }
        if (!this.ysdkplayer) return;
        this.ysdkdata = await this.ysdkplayer.getData();
        console.log("Yandex Games SDK:\nSuccesfully loaded data!");
      }
      setdebug() {
        this.debug = true;
      }
      async leaderboard(args) {
        if (!this.ysdk) return;
        const name = Scratch.Cast.toString(args.NAME);
        const score = Scratch.Cast.toNumber(args.SCORE);
        await this.ysdk.getLeaderboards()
          .then(lb => {
            lb.setLeaderboardScore(name, score);
          });
      }
      sdkenabled() {
        return !!this.ysdk || this.debug;
      }
      dataloaded() {
        return !!this.ysdkplayer && !!this.ysdkdata;
      }
      deafAE() {
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
      }
      undeafAE() {
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
      }
      showfullscreen() {
        window.isfullscreenclosed = false;
        this.isAdOpened = true;
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        if (this.debug) {
          alert("Debug mode: AD showing");
          window.isfullscreenclosed = true;
          Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
          window.triggerIFC = true;
          window.isAdOpened = false;
          return;
        }
        if (this.ysdk) {
          this.ysdk.adv.showFullscreenAdv({
            callbacks: {
              onClose: function () {
                window.isfullscreenclosed = true;
                window.triggerIFC = true;
                this.isAdOpened = false;
                Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
              },
              onError: function () {
                window.isfullscreenclosed = false;
                window.triggerIFC = true;
                this.isAdOpened = false;
              },
            },
          });
        }
      }
      showrewarded() {
        window.isrewardedwatched = false;
        window.isrewarded = false;
        this.isAdOpened = true;
        this.deafAE();
        if (this.debug) {
          window.isrewarded = confirm("Debug mode: Reward AD showing");
          window.isrewardedwatched = true;
          this.isAdOpened = false;
          this.triggerIRW();
          return;
        }
        if (this.ysdk) {
          this.ysdk.adv.showRewardedVideo({
            callbacks: {
              onOpen: () => {
                window.isrewardedwatched = false;
                window.isrewarded = false;
              },
              onRewarded: () => {
                window.isrewarded = true;
                this.isAdOpened = false;
                this.triggerIRW();
              },
              onClose: () => {
                window.isrewardedwatched = true;
                this.isAdOpened = false;
                this.undeafAE();
                this.triggerIRW();
              },
              onError: () => {
                window.isrewardedwatched = false;
                window.isrewarded = false;
                this.isAdOpened = false;
              },
            },
          });
        }
      }
      setdata(args) {
        const data = this.castToObject(args.DATA);
        const flash = Scratch.Cast.toBoolean(args.FLASH);
        if (!this.ysdk) return;
        function initPlayer() {
          return this.ysdk.getPlayer().then(player => {
            return player;
          });
        }
        initPlayer().then(player => {
          if (!player.isAuthorized()) return;
          player.setData(data, flash);
        });
      }
      getdata(args) {
        const key = Scratch.Cast.toString(args.KEY);
        if (!this.ysdk) return;
        return this.ysdk.getPlayer().then(player => {
          return player.getData(key)
        });
      }
      castToObject(value) {
        // Already an object?
        if (typeof value === 'object' && value instanceof Object && !Array.isArray(value)) {
          return value;
        }
        try {
          // Try to parse
          const result = JSON.parse(value);
          return typeof result === 'object' && result instanceof Object && !Array.isArray(result) ? result : {};
        } catch {
          return {};
        }
      }
    }
    Scratch.extensions.register(new YaGamesSDKExtension());
})(Scratch);




