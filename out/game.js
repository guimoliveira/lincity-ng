// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: C:\Users\GUILHE~1\AppData\Local\Temp\tmpd0yr9iz1.js

  if (!Module['expectedDataFileDownloads']) {
    Module['expectedDataFileDownloads'] = 0;
  }

  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'out/game.data';
      var REMOTE_PACKAGE_BASE = 'game.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = (event) => {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module['dataFileDownloads']) Module['dataFileDownloads'] = {};
              Module['dataFileDownloads'][url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module['dataFileDownloads'][url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module['dataFileDownloads']) {
            var data = Module['dataFileDownloads'][download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module['expectedDataFileDownloads']/num);
            Module['setStatus']?.(`Downloading data... (${loaded}/${total})`);
          } else if (!Module['dataFileDownloads']) {
            Module['setStatus']?.('Downloading data...');
          }
        };
        xhr.onerror = (event) => {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = (event) => {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "data", true, true);
Module['FS_createPath']("/data", "fonts", true, true);
Module['FS_createPath']("/data", "gui", true, true);
Module['FS_createPath']("/data/gui", "dialogs", true, true);
Module['FS_createPath']("/data", "help", true, true);
Module['FS_createPath']("/data/help", "ca", true, true);
Module['FS_createPath']("/data/help", "cs", true, true);
Module['FS_createPath']("/data/help", "de", true, true);
Module['FS_createPath']("/data/help", "el", true, true);
Module['FS_createPath']("/data/help", "en", true, true);
Module['FS_createPath']("/data/help", "es", true, true);
Module['FS_createPath']("/data/help", "fr", true, true);
Module['FS_createPath']("/data/help", "gd", true, true);
Module['FS_createPath']("/data/help", "gl", true, true);
Module['FS_createPath']("/data/help", "nl", true, true);
Module['FS_createPath']("/data/help", "pt_BR", true, true);
Module['FS_createPath']("/data/help", "ru", true, true);
Module['FS_createPath']("/data/help", "sv", true, true);
Module['FS_createPath']("/data/help", "tr", true, true);
Module['FS_createPath']("/data", "help_templates", true, true);
Module['FS_createPath']("/data/help_templates", "orig", true, true);
Module['FS_createPath']("/data/help_templates", "ru", true, true);
Module['FS_createPath']("/data", "images", true, true);
Module['FS_createPath']("/data/images", "gui", true, true);
Module['FS_createPath']("/data/images/gui", "buttonpanel", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "base", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "industry", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "menu", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "mining", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "misc", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "parks", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "power", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "residence", true, true);
Module['FS_createPath']("/data/images/gui/buttonpanel", "transport", true, true);
Module['FS_createPath']("/data/images/gui", "buttons", true, true);
Module['FS_createPath']("/data/images/gui/buttons", "round", true, true);
Module['FS_createPath']("/data/images/gui/buttons", "tabbed", true, true);
Module['FS_createPath']("/data/images/gui", "checkbox", true, true);
Module['FS_createPath']("/data/images/gui", "dialogs", true, true);
Module['FS_createPath']("/data/images/gui", "info", true, true);
Module['FS_createPath']("/data/images/gui", "mapview", true, true);
Module['FS_createPath']("/data/images/gui/mapview", "roundbuttons", true, true);
Module['FS_createPath']("/data/images/gui", "scrollbar", true, true);
Module['FS_createPath']("/data/images/gui", "speed", true, true);
Module['FS_createPath']("/data/images/gui", "window", true, true);
Module['FS_createPath']("/data/images/gui", "zoom", true, true);
Module['FS_createPath']("/data/images", "mainmenu", true, true);
Module['FS_createPath']("/data/images/mainmenu", "buttons", true, true);
Module['FS_createPath']("/data/images/mainmenu", "settings", true, true);
Module['FS_createPath']("/data/images", "tiles", true, true);
Module['FS_createPath']("/data", "locale", true, true);
Module['FS_createPath']("/data/locale", "gui", true, true);
Module['FS_createPath']("/data", "messages", true, true);
Module['FS_createPath']("/data", "music", true, true);
Module['FS_createPath']("/data/music", "default", true, true);
Module['FS_createPath']("/data", "opening", true, true);
Module['FS_createPath']("/data", "rosegarden", true, true);
Module['FS_createPath']("/data", "sounds", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          
          Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true,
            () => Module['removeRunDependency'](`fp ${that.name}`),
            () => err(`Preloading file ${that.name} failed`),
            false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change

          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_out/game.data');

      };
      Module['addRunDependency']('datafile_out/game.data');

      if (!Module['preloadResults']) Module['preloadResults'] = {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/data/colour.pal", "start": 0, "end": 6038}, {"filename": "/data/fonts/sans.ttf", "start": 6038, "end": 625146}, {"filename": "/data/gui/app.xml", "start": 625146, "end": 627684}, {"filename": "/data/gui/buttonpanel.xml", "start": 627684, "end": 658735}, {"filename": "/data/gui/credits.xml", "start": 658735, "end": 661444}, {"filename": "/data/gui/creditslist.xml", "start": 661444, "end": 665753}, {"filename": "/data/gui/dialogs/allgone.xml", "start": 665753, "end": 667617}, {"filename": "/data/gui/dialogs/blacksmithup.xml", "start": 667617, "end": 669652}, {"filename": "/data/gui/dialogs/bulldoze_monument_yn.xml", "start": 669652, "end": 672003}, {"filename": "/data/gui/dialogs/bulldoze_river_yn.xml", "start": 672003, "end": 674358}, {"filename": "/data/gui/dialogs/bulldoze_shanty_yn.xml", "start": 674358, "end": 676733}, {"filename": "/data/gui/dialogs/coal_survey_yn.xml", "start": 676733, "end": 679097}, {"filename": "/data/gui/dialogs/coalmineup.xml", "start": 679097, "end": 681115}, {"filename": "/data/gui/dialogs/coalpowerup.xml", "start": 681115, "end": 683130}, {"filename": "/data/gui/dialogs/cricketup.xml", "start": 683130, "end": 685221}, {"filename": "/data/gui/dialogs/fire.xml", "start": 685221, "end": 687075}, {"filename": "/data/gui/dialogs/firestationup.xml", "start": 687075, "end": 689188}, {"filename": "/data/gui/dialogs/gamestats.xml", "start": 689188, "end": 705655}, {"filename": "/data/gui/dialogs/healthup.xml", "start": 705655, "end": 707747}, {"filename": "/data/gui/dialogs/hvindustryup.xml", "start": 707747, "end": 709789}, {"filename": "/data/gui/dialogs/import-exportup.xml", "start": 709789, "end": 711746}, {"filename": "/data/gui/dialogs/launch-evac.xml", "start": 711746, "end": 713695}, {"filename": "/data/gui/dialogs/launch-fail.xml", "start": 713695, "end": 715675}, {"filename": "/data/gui/dialogs/launch-gone.xml", "start": 715675, "end": 717554}, {"filename": "/data/gui/dialogs/launch-good.xml", "start": 717554, "end": 719387}, {"filename": "/data/gui/dialogs/launch_rocket_yn.xml", "start": 719387, "end": 721791}, {"filename": "/data/gui/dialogs/ltindustryup.xml", "start": 721791, "end": 723821}, {"filename": "/data/gui/dialogs/millup.xml", "start": 723821, "end": 725882}, {"filename": "/data/gui/dialogs/mod_wind_up.xml", "start": 725882, "end": 727899}, {"filename": "/data/gui/dialogs/no-credit-parkland.xml", "start": 727899, "end": 729822}, {"filename": "/data/gui/dialogs/no-credit-recycle.xml", "start": 729822, "end": 731757}, {"filename": "/data/gui/dialogs/no-credit-rocket.xml", "start": 731757, "end": 733693}, {"filename": "/data/gui/dialogs/no-credit-solar-power.xml", "start": 733693, "end": 735631}, {"filename": "/data/gui/dialogs/no-credit-university.xml", "start": 735631, "end": 737561}, {"filename": "/data/gui/dialogs/nobull-tip.xml", "start": 737561, "end": 739403}, {"filename": "/data/gui/dialogs/parkup.xml", "start": 739403, "end": 741417}, {"filename": "/data/gui/dialogs/portdialog.xml", "start": 741417, "end": 748210}, {"filename": "/data/gui/dialogs/potteryup.xml", "start": 748210, "end": 750271}, {"filename": "/data/gui/dialogs/railwayup.xml", "start": 750271, "end": 752255}, {"filename": "/data/gui/dialogs/recycleup.xml", "start": 752255, "end": 754303}, {"filename": "/data/gui/dialogs/riverup.xml", "start": 754303, "end": 756283}, {"filename": "/data/gui/dialogs/roadup.xml", "start": 756283, "end": 758210}, {"filename": "/data/gui/dialogs/rocketup.xml", "start": 758210, "end": 760291}, {"filename": "/data/gui/dialogs/schoolup.xml", "start": 760291, "end": 762325}, {"filename": "/data/gui/dialogs/shfire-oc.xml", "start": 762325, "end": 764220}, {"filename": "/data/gui/dialogs/shfire-uc.xml", "start": 764220, "end": 766117}, {"filename": "/data/gui/dialogs/solarpowerup.xml", "start": 766117, "end": 768125}, {"filename": "/data/gui/dialogs/sustain.xml", "start": 768125, "end": 770012}, {"filename": "/data/gui/dialogs/tradedialog.xml", "start": 770012, "end": 775948}, {"filename": "/data/gui/dialogs/universityup.xml", "start": 775948, "end": 777997}, {"filename": "/data/gui/dialogs/warning.xml", "start": 777997, "end": 779801}, {"filename": "/data/gui/dialogs/windmillup.xml", "start": 779801, "end": 781787}, {"filename": "/data/gui/helpwindow.xml", "start": 781787, "end": 784097}, {"filename": "/data/gui/identity.xsl", "start": 784097, "end": 784560}, {"filename": "/data/gui/loadgame.xml", "start": 784560, "end": 788934}, {"filename": "/data/gui/mainmenu.xml", "start": 788934, "end": 794711}, {"filename": "/data/gui/messagearea.xml", "start": 794711, "end": 796569}, {"filename": "/data/gui/minimap.xml", "start": 796569, "end": 805311}, {"filename": "/data/gui/minimapswitchbuttons.xml", "start": 805311, "end": 811646}, {"filename": "/data/gui/mps.xml", "start": 811646, "end": 814307}, {"filename": "/data/gui/newgame.xml", "start": 814307, "end": 823261}, {"filename": "/data/gui/options.xml", "start": 823261, "end": 829992}, {"filename": "/data/gui/pbar.xml", "start": 829992, "end": 835844}, {"filename": "/data/gui/pbar2nd.xml", "start": 835844, "end": 841760}, {"filename": "/data/gui/piemenu.xml", "start": 841760, "end": 844849}, {"filename": "/data/gui/savegame.xml", "start": 844849, "end": 849297}, {"filename": "/data/gui/speedpanel.xml", "start": 849297, "end": 852581}, {"filename": "/data/gui/too-old.xml", "start": 852581, "end": 854520}, {"filename": "/data/help/ca/blacksmith.xml", "start": 854520, "end": 855708}, {"filename": "/data/help/ca/bulldoze.xml", "start": 855708, "end": 856605}, {"filename": "/data/help/ca/button-index.xml", "start": 856605, "end": 861165}, {"filename": "/data/help/ca/coal.xml", "start": 861165, "end": 862294}, {"filename": "/data/help/ca/coalmine.xml", "start": 862294, "end": 863799}, {"filename": "/data/help/ca/commune.xml", "start": 863799, "end": 864984}, {"filename": "/data/help/ca/cricket.xml", "start": 864984, "end": 866718}, {"filename": "/data/help/ca/dialogs.xml", "start": 866718, "end": 867362}, {"filename": "/data/help/ca/economy.xml", "start": 867362, "end": 868581}, {"filename": "/data/help/ca/export.xml", "start": 868581, "end": 869693}, {"filename": "/data/help/ca/farm.xml", "start": 869693, "end": 871243}, {"filename": "/data/help/ca/fast.xml", "start": 871243, "end": 871728}, {"filename": "/data/help/ca/finance.xml", "start": 871728, "end": 872494}, {"filename": "/data/help/ca/firestation.xml", "start": 872494, "end": 874269}, {"filename": "/data/help/ca/food.xml", "start": 874269, "end": 875015}, {"filename": "/data/help/ca/goods.xml", "start": 875015, "end": 875766}, {"filename": "/data/help/ca/health.xml", "start": 875766, "end": 877851}, {"filename": "/data/help/ca/help.xml", "start": 877851, "end": 879169}, {"filename": "/data/help/ca/housing.xml", "start": 879169, "end": 880272}, {"filename": "/data/help/ca/index.xml", "start": 880272, "end": 884017}, {"filename": "/data/help/ca/industryh.xml", "start": 884017, "end": 885499}, {"filename": "/data/help/ca/industryl.xml", "start": 885499, "end": 887058}, {"filename": "/data/help/ca/keys.xml", "start": 887058, "end": 889091}, {"filename": "/data/help/ca/labor.xml", "start": 889091, "end": 890459}, {"filename": "/data/help/ca/market.xml", "start": 890459, "end": 893500}, {"filename": "/data/help/ca/medium.xml", "start": 893500, "end": 893956}, {"filename": "/data/help/ca/mill.xml", "start": 893956, "end": 895360}, {"filename": "/data/help/ca/mini-screen.xml", "start": 895360, "end": 896572}, {"filename": "/data/help/ca/monument.xml", "start": 896572, "end": 898136}, {"filename": "/data/help/ca/msb-coal.xml", "start": 898136, "end": 899584}, {"filename": "/data/help/ca/msb-cricket.xml", "start": 899584, "end": 900921}, {"filename": "/data/help/ca/msb-fire.xml", "start": 900921, "end": 902272}, {"filename": "/data/help/ca/msb-health.xml", "start": 902272, "end": 903871}, {"filename": "/data/help/ca/msb-normal.xml", "start": 903871, "end": 904992}, {"filename": "/data/help/ca/msb-pol.xml", "start": 904992, "end": 906473}, {"filename": "/data/help/ca/msb-power.xml", "start": 906473, "end": 907879}, {"filename": "/data/help/ca/msb-starve.xml", "start": 907879, "end": 909168}, {"filename": "/data/help/ca/msb-transport.xml", "start": 909168, "end": 910303}, {"filename": "/data/help/ca/msb-ub40.xml", "start": 910303, "end": 911633}, {"filename": "/data/help/ca/ore.xml", "start": 911633, "end": 912463}, {"filename": "/data/help/ca/oremine.xml", "start": 912463, "end": 913600}, {"filename": "/data/help/ca/other-costs.xml", "start": 913600, "end": 914347}, {"filename": "/data/help/ca/park.xml", "start": 914347, "end": 915518}, {"filename": "/data/help/ca/pause.xml", "start": 915518, "end": 915780}, {"filename": "/data/help/ca/pbar.xml", "start": 915780, "end": 916280}, {"filename": "/data/help/ca/pollution.xml", "start": 916280, "end": 917882}, {"filename": "/data/help/ca/port.xml", "start": 917882, "end": 919612}, {"filename": "/data/help/ca/pottery.xml", "start": 919612, "end": 920655}, {"filename": "/data/help/ca/powerline.xml", "start": 920655, "end": 921941}, {"filename": "/data/help/ca/powerscoal.xml", "start": 921941, "end": 923190}, {"filename": "/data/help/ca/powerssolar.xml", "start": 923190, "end": 924365}, {"filename": "/data/help/ca/query.xml", "start": 924365, "end": 924899}, {"filename": "/data/help/ca/rail.xml", "start": 924899, "end": 925728}, {"filename": "/data/help/ca/recycle.xml", "start": 925728, "end": 926800}, {"filename": "/data/help/ca/residential.xml", "start": 926800, "end": 928420}, {"filename": "/data/help/ca/river.xml", "start": 928420, "end": 929808}, {"filename": "/data/help/ca/road.xml", "start": 929808, "end": 930538}, {"filename": "/data/help/ca/rocket.xml", "start": 930538, "end": 932745}, {"filename": "/data/help/ca/school.xml", "start": 932745, "end": 934281}, {"filename": "/data/help/ca/slow.xml", "start": 934281, "end": 934757}, {"filename": "/data/help/ca/steel.xml", "start": 934757, "end": 936044}, {"filename": "/data/help/ca/substation.xml", "start": 936044, "end": 936886}, {"filename": "/data/help/ca/sustain.xml", "start": 936886, "end": 938498}, {"filename": "/data/help/ca/tech-level.xml", "start": 938498, "end": 940016}, {"filename": "/data/help/ca/tip.xml", "start": 940016, "end": 941029}, {"filename": "/data/help/ca/track.xml", "start": 941029, "end": 941624}, {"filename": "/data/help/ca/transport.xml", "start": 941624, "end": 944362}, {"filename": "/data/help/ca/tutorial-advanced.xml", "start": 944362, "end": 945785}, {"filename": "/data/help/ca/tutorial-aim.xml", "start": 945785, "end": 946920}, {"filename": "/data/help/ca/tutorial-basics.xml", "start": 946920, "end": 951413}, {"filename": "/data/help/ca/tutorial-overview.xml", "start": 951413, "end": 952672}, {"filename": "/data/help/ca/tutorial-scenario.xml", "start": 952672, "end": 953296}, {"filename": "/data/help/ca/tutorial.xml", "start": 953296, "end": 953729}, {"filename": "/data/help/ca/university.xml", "start": 953729, "end": 955220}, {"filename": "/data/help/ca/windmill.xml", "start": 955220, "end": 957154}, {"filename": "/data/help/cs/blacksmith.xml", "start": 957154, "end": 958391}, {"filename": "/data/help/cs/economy.xml", "start": 958391, "end": 959389}, {"filename": "/data/help/cs/food.xml", "start": 959389, "end": 960059}, {"filename": "/data/help/cs/help.xml", "start": 960059, "end": 960790}, {"filename": "/data/help/cs/index.xml", "start": 960790, "end": 964081}, {"filename": "/data/help/cs/keys.xml", "start": 964081, "end": 966282}, {"filename": "/data/help/cs/ore.xml", "start": 966282, "end": 966967}, {"filename": "/data/help/cs/pause.xml", "start": 966967, "end": 967272}, {"filename": "/data/help/cs/substation.xml", "start": 967272, "end": 968088}, {"filename": "/data/help/de/blacksmith.xml", "start": 968088, "end": 969266}, {"filename": "/data/help/de/bulldoze.xml", "start": 969266, "end": 970330}, {"filename": "/data/help/de/button-index.xml", "start": 970330, "end": 974077}, {"filename": "/data/help/de/coal.xml", "start": 974077, "end": 975248}, {"filename": "/data/help/de/coalmine.xml", "start": 975248, "end": 976749}, {"filename": "/data/help/de/commune.xml", "start": 976749, "end": 978134}, {"filename": "/data/help/de/cricket.xml", "start": 978134, "end": 979854}, {"filename": "/data/help/de/dialogs.xml", "start": 979854, "end": 980423}, {"filename": "/data/help/de/economy.xml", "start": 980423, "end": 981648}, {"filename": "/data/help/de/export.xml", "start": 981648, "end": 982890}, {"filename": "/data/help/de/farm.xml", "start": 982890, "end": 984340}, {"filename": "/data/help/de/fast.xml", "start": 984340, "end": 984788}, {"filename": "/data/help/de/finance.xml", "start": 984788, "end": 986060}, {"filename": "/data/help/de/firestation.xml", "start": 986060, "end": 988010}, {"filename": "/data/help/de/food.xml", "start": 988010, "end": 988766}, {"filename": "/data/help/de/goods.xml", "start": 988766, "end": 989613}, {"filename": "/data/help/de/health.xml", "start": 989613, "end": 991731}, {"filename": "/data/help/de/help.xml", "start": 991731, "end": 992689}, {"filename": "/data/help/de/housing.xml", "start": 992689, "end": 994110}, {"filename": "/data/help/de/index.xml", "start": 994110, "end": 998061}, {"filename": "/data/help/de/industryh.xml", "start": 998061, "end": 999578}, {"filename": "/data/help/de/industryl.xml", "start": 999578, "end": 1001069}, {"filename": "/data/help/de/keys.xml", "start": 1001069, "end": 1003460}, {"filename": "/data/help/de/labor.xml", "start": 1003460, "end": 1004722}, {"filename": "/data/help/de/market.xml", "start": 1004722, "end": 1008035}, {"filename": "/data/help/de/medium.xml", "start": 1008035, "end": 1008532}, {"filename": "/data/help/de/mill.xml", "start": 1008532, "end": 1009991}, {"filename": "/data/help/de/mini-screen.xml", "start": 1009991, "end": 1011318}, {"filename": "/data/help/de/monument.xml", "start": 1011318, "end": 1012928}, {"filename": "/data/help/de/msb-coal.xml", "start": 1012928, "end": 1014507}, {"filename": "/data/help/de/msb-cricket.xml", "start": 1014507, "end": 1015822}, {"filename": "/data/help/de/msb-fire.xml", "start": 1015822, "end": 1017137}, {"filename": "/data/help/de/msb-health.xml", "start": 1017137, "end": 1018457}, {"filename": "/data/help/de/msb-normal.xml", "start": 1018457, "end": 1019600}, {"filename": "/data/help/de/msb-pol.xml", "start": 1019600, "end": 1021020}, {"filename": "/data/help/de/msb-power.xml", "start": 1021020, "end": 1022375}, {"filename": "/data/help/de/msb-starve.xml", "start": 1022375, "end": 1023841}, {"filename": "/data/help/de/msb-transport.xml", "start": 1023841, "end": 1025312}, {"filename": "/data/help/de/msb-ub40.xml", "start": 1025312, "end": 1026585}, {"filename": "/data/help/de/ore.xml", "start": 1026585, "end": 1027240}, {"filename": "/data/help/de/oremine.xml", "start": 1027240, "end": 1028269}, {"filename": "/data/help/de/other-costs.xml", "start": 1028269, "end": 1028755}, {"filename": "/data/help/de/park.xml", "start": 1028755, "end": 1030137}, {"filename": "/data/help/de/pause.xml", "start": 1030137, "end": 1030331}, {"filename": "/data/help/de/pbar.xml", "start": 1030331, "end": 1030841}, {"filename": "/data/help/de/pollution.xml", "start": 1030841, "end": 1032262}, {"filename": "/data/help/de/port.xml", "start": 1032262, "end": 1033979}, {"filename": "/data/help/de/pottery.xml", "start": 1033979, "end": 1035016}, {"filename": "/data/help/de/powerline.xml", "start": 1035016, "end": 1036408}, {"filename": "/data/help/de/powerscoal.xml", "start": 1036408, "end": 1037450}, {"filename": "/data/help/de/powerssolar.xml", "start": 1037450, "end": 1038480}, {"filename": "/data/help/de/query.xml", "start": 1038480, "end": 1039078}, {"filename": "/data/help/de/rail.xml", "start": 1039078, "end": 1039905}, {"filename": "/data/help/de/recycle.xml", "start": 1039905, "end": 1040985}, {"filename": "/data/help/de/residential.xml", "start": 1040985, "end": 1043362}, {"filename": "/data/help/de/river.xml", "start": 1043362, "end": 1044677}, {"filename": "/data/help/de/road.xml", "start": 1044677, "end": 1045479}, {"filename": "/data/help/de/rocket.xml", "start": 1045479, "end": 1047516}, {"filename": "/data/help/de/school.xml", "start": 1047516, "end": 1048983}, {"filename": "/data/help/de/slow.xml", "start": 1048983, "end": 1049370}, {"filename": "/data/help/de/steel.xml", "start": 1049370, "end": 1050607}, {"filename": "/data/help/de/substation.xml", "start": 1050607, "end": 1051544}, {"filename": "/data/help/de/sustain.xml", "start": 1051544, "end": 1053330}, {"filename": "/data/help/de/tech-level.xml", "start": 1053330, "end": 1055041}, {"filename": "/data/help/de/tip.xml", "start": 1055041, "end": 1056058}, {"filename": "/data/help/de/track.xml", "start": 1056058, "end": 1056697}, {"filename": "/data/help/de/transport.xml", "start": 1056697, "end": 1060055}, {"filename": "/data/help/de/tutorial-advanced.xml", "start": 1060055, "end": 1061934}, {"filename": "/data/help/de/tutorial-aim.xml", "start": 1061934, "end": 1063270}, {"filename": "/data/help/de/tutorial-basics.xml", "start": 1063270, "end": 1068220}, {"filename": "/data/help/de/tutorial-overview.xml", "start": 1068220, "end": 1069471}, {"filename": "/data/help/de/tutorial-scenario.xml", "start": 1069471, "end": 1071124}, {"filename": "/data/help/de/tutorial.xml", "start": 1071124, "end": 1071526}, {"filename": "/data/help/de/university.xml", "start": 1071526, "end": 1073147}, {"filename": "/data/help/de/waterwell.xml", "start": 1073147, "end": 1073643}, {"filename": "/data/help/de/windmill.xml", "start": 1073643, "end": 1075609}, {"filename": "/data/help/el/blacksmith.xml", "start": 1075609, "end": 1078103}, {"filename": "/data/help/el/bulldoze.xml", "start": 1078103, "end": 1080044}, {"filename": "/data/help/el/button-index.xml", "start": 1080044, "end": 1085302}, {"filename": "/data/help/el/coal.xml", "start": 1085302, "end": 1087198}, {"filename": "/data/help/el/coalmine.xml", "start": 1087198, "end": 1089576}, {"filename": "/data/help/el/commune.xml", "start": 1089576, "end": 1091419}, {"filename": "/data/help/el/cricket.xml", "start": 1091419, "end": 1094144}, {"filename": "/data/help/el/dialogs.xml", "start": 1094144, "end": 1094874}, {"filename": "/data/help/el/economy.xml", "start": 1094874, "end": 1096883}, {"filename": "/data/help/el/export.xml", "start": 1096883, "end": 1098867}, {"filename": "/data/help/el/farm.xml", "start": 1098867, "end": 1100828}, {"filename": "/data/help/el/fast.xml", "start": 1100828, "end": 1101603}, {"filename": "/data/help/el/finance.xml", "start": 1101603, "end": 1102840}, {"filename": "/data/help/el/firestation.xml", "start": 1102840, "end": 1105880}, {"filename": "/data/help/el/food.xml", "start": 1105880, "end": 1106924}, {"filename": "/data/help/el/goods.xml", "start": 1106924, "end": 1108025}, {"filename": "/data/help/el/health.xml", "start": 1108025, "end": 1111603}, {"filename": "/data/help/el/help.xml", "start": 1111603, "end": 1113535}, {"filename": "/data/help/el/housing.xml", "start": 1113535, "end": 1115390}, {"filename": "/data/help/el/index.xml", "start": 1115390, "end": 1120253}, {"filename": "/data/help/el/industryh.xml", "start": 1120253, "end": 1122647}, {"filename": "/data/help/el/industryl.xml", "start": 1122647, "end": 1124752}, {"filename": "/data/help/el/keys.xml", "start": 1124752, "end": 1128175}, {"filename": "/data/help/el/labor.xml", "start": 1128175, "end": 1131118}, {"filename": "/data/help/el/market.xml", "start": 1131118, "end": 1136258}, {"filename": "/data/help/el/medium.xml", "start": 1136258, "end": 1136815}, {"filename": "/data/help/el/mill.xml", "start": 1136815, "end": 1138922}, {"filename": "/data/help/el/mini-screen.xml", "start": 1138922, "end": 1140916}, {"filename": "/data/help/el/monument.xml", "start": 1140916, "end": 1143576}, {"filename": "/data/help/el/msb-coal.xml", "start": 1143576, "end": 1145938}, {"filename": "/data/help/el/msb-cricket.xml", "start": 1145938, "end": 1147944}, {"filename": "/data/help/el/msb-fire.xml", "start": 1147944, "end": 1149996}, {"filename": "/data/help/el/msb-health.xml", "start": 1149996, "end": 1152333}, {"filename": "/data/help/el/msb-normal.xml", "start": 1152333, "end": 1154005}, {"filename": "/data/help/el/msb-pol.xml", "start": 1154005, "end": 1156255}, {"filename": "/data/help/el/msb-power.xml", "start": 1156255, "end": 1158404}, {"filename": "/data/help/el/msb-starve.xml", "start": 1158404, "end": 1160387}, {"filename": "/data/help/el/msb-transport.xml", "start": 1160387, "end": 1162442}, {"filename": "/data/help/el/msb-ub40.xml", "start": 1162442, "end": 1164401}, {"filename": "/data/help/el/ore.xml", "start": 1164401, "end": 1165459}, {"filename": "/data/help/el/oremine.xml", "start": 1165459, "end": 1167610}, {"filename": "/data/help/el/other-costs.xml", "start": 1167610, "end": 1168962}, {"filename": "/data/help/el/park.xml", "start": 1168962, "end": 1170800}, {"filename": "/data/help/el/pause.xml", "start": 1170800, "end": 1171286}, {"filename": "/data/help/el/pbar.xml", "start": 1171286, "end": 1172176}, {"filename": "/data/help/el/pollution.xml", "start": 1172176, "end": 1174516}, {"filename": "/data/help/el/port.xml", "start": 1174516, "end": 1177410}, {"filename": "/data/help/el/pottery.xml", "start": 1177410, "end": 1179151}, {"filename": "/data/help/el/powerline.xml", "start": 1179151, "end": 1181269}, {"filename": "/data/help/el/powerscoal.xml", "start": 1181269, "end": 1183003}, {"filename": "/data/help/el/powerssolar.xml", "start": 1183003, "end": 1184837}, {"filename": "/data/help/el/query.xml", "start": 1184837, "end": 1185753}, {"filename": "/data/help/el/rail.xml", "start": 1185753, "end": 1187015}, {"filename": "/data/help/el/recycle.xml", "start": 1187015, "end": 1189024}, {"filename": "/data/help/el/residential.xml", "start": 1189024, "end": 1191751}, {"filename": "/data/help/el/river.xml", "start": 1191751, "end": 1194672}, {"filename": "/data/help/el/road.xml", "start": 1194672, "end": 1195908}, {"filename": "/data/help/el/rocket.xml", "start": 1195908, "end": 1199908}, {"filename": "/data/help/el/school.xml", "start": 1199908, "end": 1202289}, {"filename": "/data/help/el/slow.xml", "start": 1202289, "end": 1203003}, {"filename": "/data/help/el/steel.xml", "start": 1203003, "end": 1205105}, {"filename": "/data/help/el/substation.xml", "start": 1205105, "end": 1206462}, {"filename": "/data/help/el/sustain.xml", "start": 1206462, "end": 1209183}, {"filename": "/data/help/el/tech-level.xml", "start": 1209183, "end": 1211890}, {"filename": "/data/help/el/tip.xml", "start": 1211890, "end": 1213461}, {"filename": "/data/help/el/track.xml", "start": 1213461, "end": 1214362}, {"filename": "/data/help/el/transport.xml", "start": 1214362, "end": 1219133}, {"filename": "/data/help/el/tutorial-advanced.xml", "start": 1219133, "end": 1221566}, {"filename": "/data/help/el/tutorial-aim.xml", "start": 1221566, "end": 1223388}, {"filename": "/data/help/el/tutorial-basics.xml", "start": 1223388, "end": 1231675}, {"filename": "/data/help/el/tutorial-overview.xml", "start": 1231675, "end": 1234107}, {"filename": "/data/help/el/tutorial-scenario.xml", "start": 1234107, "end": 1235219}, {"filename": "/data/help/el/tutorial.xml", "start": 1235219, "end": 1235769}, {"filename": "/data/help/el/university.xml", "start": 1235769, "end": 1238211}, {"filename": "/data/help/el/windmill.xml", "start": 1238211, "end": 1241570}, {"filename": "/data/help/en/blacksmith.xml", "start": 1241570, "end": 1242877}, {"filename": "/data/help/en/bulldoze.xml", "start": 1242877, "end": 1244017}, {"filename": "/data/help/en/button-index.xml", "start": 1244017, "end": 1248513}, {"filename": "/data/help/en/coal.xml", "start": 1248513, "end": 1249702}, {"filename": "/data/help/en/coalmine.xml", "start": 1249702, "end": 1252126}, {"filename": "/data/help/en/commodities.xml", "start": 1252126, "end": 1253464}, {"filename": "/data/help/en/commune.xml", "start": 1253464, "end": 1255315}, {"filename": "/data/help/en/cricket.xml", "start": 1255315, "end": 1257127}, {"filename": "/data/help/en/dialogs.xml", "start": 1257127, "end": 1257813}, {"filename": "/data/help/en/economy.xml", "start": 1257813, "end": 1258939}, {"filename": "/data/help/en/evacuate.xml", "start": 1258939, "end": 1259950}, {"filename": "/data/help/en/export.xml", "start": 1259950, "end": 1261177}, {"filename": "/data/help/en/farm.xml", "start": 1261177, "end": 1262860}, {"filename": "/data/help/en/fast.xml", "start": 1262860, "end": 1263748}, {"filename": "/data/help/en/finance.xml", "start": 1263748, "end": 1264632}, {"filename": "/data/help/en/firestation.xml", "start": 1264632, "end": 1266226}, {"filename": "/data/help/en/food.xml", "start": 1266226, "end": 1267030}, {"filename": "/data/help/en/goods.xml", "start": 1267030, "end": 1267829}, {"filename": "/data/help/en/health.xml", "start": 1267829, "end": 1269691}, {"filename": "/data/help/en/help.xml", "start": 1269691, "end": 1270882}, {"filename": "/data/help/en/housing.xml", "start": 1270882, "end": 1272280}, {"filename": "/data/help/en/index.xml", "start": 1272280, "end": 1276144}, {"filename": "/data/help/en/industryh.xml", "start": 1276144, "end": 1277778}, {"filename": "/data/help/en/industryl.xml", "start": 1277778, "end": 1279594}, {"filename": "/data/help/en/keys.xml", "start": 1279594, "end": 1281558}, {"filename": "/data/help/en/labor.xml", "start": 1281558, "end": 1283115}, {"filename": "/data/help/en/market.xml", "start": 1283115, "end": 1285994}, {"filename": "/data/help/en/medium.xml", "start": 1285994, "end": 1286591}, {"filename": "/data/help/en/mill.xml", "start": 1286591, "end": 1288104}, {"filename": "/data/help/en/mini-screen.xml", "start": 1288104, "end": 1289385}, {"filename": "/data/help/en/monument.xml", "start": 1289385, "end": 1291201}, {"filename": "/data/help/en/msb-coal.xml", "start": 1291201, "end": 1292659}, {"filename": "/data/help/en/msb-cricket.xml", "start": 1292659, "end": 1293941}, {"filename": "/data/help/en/msb-fire.xml", "start": 1293941, "end": 1295215}, {"filename": "/data/help/en/msb-health.xml", "start": 1295215, "end": 1296492}, {"filename": "/data/help/en/msb-normal.xml", "start": 1296492, "end": 1297617}, {"filename": "/data/help/en/msb-pol.xml", "start": 1297617, "end": 1299008}, {"filename": "/data/help/en/msb-power.xml", "start": 1299008, "end": 1300283}, {"filename": "/data/help/en/msb-starve.xml", "start": 1300283, "end": 1301641}, {"filename": "/data/help/en/msb-transport.xml", "start": 1301641, "end": 1303248}, {"filename": "/data/help/en/msb-ub40.xml", "start": 1303248, "end": 1304569}, {"filename": "/data/help/en/ore.xml", "start": 1304569, "end": 1305353}, {"filename": "/data/help/en/oremine.xml", "start": 1305353, "end": 1306917}, {"filename": "/data/help/en/other-costs.xml", "start": 1306917, "end": 1307769}, {"filename": "/data/help/en/park.xml", "start": 1307769, "end": 1309225}, {"filename": "/data/help/en/pause.xml", "start": 1309225, "end": 1309749}, {"filename": "/data/help/en/pbar.xml", "start": 1309749, "end": 1310601}, {"filename": "/data/help/en/pollution.xml", "start": 1310601, "end": 1312092}, {"filename": "/data/help/en/port.xml", "start": 1312092, "end": 1314993}, {"filename": "/data/help/en/pottery.xml", "start": 1314993, "end": 1316078}, {"filename": "/data/help/en/power.xml", "start": 1316078, "end": 1317522}, {"filename": "/data/help/en/powerline.xml", "start": 1317522, "end": 1319037}, {"filename": "/data/help/en/powerscoal.xml", "start": 1319037, "end": 1320612}, {"filename": "/data/help/en/powerssolar.xml", "start": 1320612, "end": 1321811}, {"filename": "/data/help/en/query.xml", "start": 1321811, "end": 1322712}, {"filename": "/data/help/en/rail.xml", "start": 1322712, "end": 1323804}, {"filename": "/data/help/en/recycle.xml", "start": 1323804, "end": 1325318}, {"filename": "/data/help/en/residential.xml", "start": 1325318, "end": 1328097}, {"filename": "/data/help/en/river.xml", "start": 1328097, "end": 1329379}, {"filename": "/data/help/en/road.xml", "start": 1329379, "end": 1330385}, {"filename": "/data/help/en/rocket.xml", "start": 1330385, "end": 1332515}, {"filename": "/data/help/en/school.xml", "start": 1332515, "end": 1334170}, {"filename": "/data/help/en/slow.xml", "start": 1334170, "end": 1334804}, {"filename": "/data/help/en/steel.xml", "start": 1334804, "end": 1336037}, {"filename": "/data/help/en/substation.xml", "start": 1336037, "end": 1337267}, {"filename": "/data/help/en/sustain.xml", "start": 1337267, "end": 1338893}, {"filename": "/data/help/en/tech-level.xml", "start": 1338893, "end": 1340490}, {"filename": "/data/help/en/tip.xml", "start": 1340490, "end": 1342165}, {"filename": "/data/help/en/track.xml", "start": 1342165, "end": 1343029}, {"filename": "/data/help/en/transport.xml", "start": 1343029, "end": 1344914}, {"filename": "/data/help/en/tutorial-advanced.xml", "start": 1344914, "end": 1346257}, {"filename": "/data/help/en/tutorial-aim.xml", "start": 1346257, "end": 1347361}, {"filename": "/data/help/en/tutorial-basics.xml", "start": 1347361, "end": 1351374}, {"filename": "/data/help/en/tutorial-overview.xml", "start": 1351374, "end": 1352526}, {"filename": "/data/help/en/tutorial-scenario.xml", "start": 1352526, "end": 1353302}, {"filename": "/data/help/en/tutorial.xml", "start": 1353302, "end": 1353817}, {"filename": "/data/help/en/university.xml", "start": 1353817, "end": 1355484}, {"filename": "/data/help/en/waste.xml", "start": 1355484, "end": 1356314}, {"filename": "/data/help/en/water.xml", "start": 1356314, "end": 1357162}, {"filename": "/data/help/en/waterwell.xml", "start": 1357162, "end": 1358103}, {"filename": "/data/help/en/windmill.xml", "start": 1358103, "end": 1359992}, {"filename": "/data/help/es/blacksmith.xml", "start": 1359992, "end": 1361217}, {"filename": "/data/help/es/bulldoze.xml", "start": 1361217, "end": 1362185}, {"filename": "/data/help/es/button-index.xml", "start": 1362185, "end": 1366717}, {"filename": "/data/help/es/coal.xml", "start": 1366717, "end": 1367808}, {"filename": "/data/help/es/coalmine.xml", "start": 1367808, "end": 1369364}, {"filename": "/data/help/es/commune.xml", "start": 1369364, "end": 1370493}, {"filename": "/data/help/es/cricket.xml", "start": 1370493, "end": 1372343}, {"filename": "/data/help/es/dialogs.xml", "start": 1372343, "end": 1372939}, {"filename": "/data/help/es/economy.xml", "start": 1372939, "end": 1374007}, {"filename": "/data/help/es/export.xml", "start": 1374007, "end": 1375485}, {"filename": "/data/help/es/farm.xml", "start": 1375485, "end": 1376946}, {"filename": "/data/help/es/fast.xml", "start": 1376946, "end": 1377524}, {"filename": "/data/help/es/finance.xml", "start": 1377524, "end": 1378639}, {"filename": "/data/help/es/firestation.xml", "start": 1378639, "end": 1380547}, {"filename": "/data/help/es/food.xml", "start": 1380547, "end": 1381286}, {"filename": "/data/help/es/goods.xml", "start": 1381286, "end": 1382066}, {"filename": "/data/help/es/health.xml", "start": 1382066, "end": 1384178}, {"filename": "/data/help/es/help.xml", "start": 1384178, "end": 1384926}, {"filename": "/data/help/es/housing.xml", "start": 1384926, "end": 1385981}, {"filename": "/data/help/es/industryh.xml", "start": 1385981, "end": 1387610}, {"filename": "/data/help/es/industryl.xml", "start": 1387610, "end": 1389158}, {"filename": "/data/help/es/keys.xml", "start": 1389158, "end": 1391603}, {"filename": "/data/help/es/labor.xml", "start": 1391603, "end": 1393332}, {"filename": "/data/help/es/market.xml", "start": 1393332, "end": 1395440}, {"filename": "/data/help/es/medium.xml", "start": 1395440, "end": 1395898}, {"filename": "/data/help/es/mill.xml", "start": 1395898, "end": 1397401}, {"filename": "/data/help/es/mini-screen.xml", "start": 1397401, "end": 1398662}, {"filename": "/data/help/es/monument.xml", "start": 1398662, "end": 1400282}, {"filename": "/data/help/es/msb-coal.xml", "start": 1400282, "end": 1401769}, {"filename": "/data/help/es/msb-cricket.xml", "start": 1401769, "end": 1403109}, {"filename": "/data/help/es/msb-fire.xml", "start": 1403109, "end": 1404441}, {"filename": "/data/help/es/msb-health.xml", "start": 1404441, "end": 1406066}, {"filename": "/data/help/es/msb-normal.xml", "start": 1406066, "end": 1407230}, {"filename": "/data/help/es/msb-pol.xml", "start": 1407230, "end": 1408698}, {"filename": "/data/help/es/msb-power.xml", "start": 1408698, "end": 1410109}, {"filename": "/data/help/es/msb-starve.xml", "start": 1410109, "end": 1411436}, {"filename": "/data/help/es/msb-ub40.xml", "start": 1411436, "end": 1412758}, {"filename": "/data/help/es/ore.xml", "start": 1412758, "end": 1413472}, {"filename": "/data/help/es/oremine.xml", "start": 1413472, "end": 1414700}, {"filename": "/data/help/es/other-costs.xml", "start": 1414700, "end": 1415641}, {"filename": "/data/help/es/park.xml", "start": 1415641, "end": 1416801}, {"filename": "/data/help/es/pause.xml", "start": 1416801, "end": 1417065}, {"filename": "/data/help/es/pbar.xml", "start": 1417065, "end": 1417595}, {"filename": "/data/help/es/pollution.xml", "start": 1417595, "end": 1419115}, {"filename": "/data/help/es/port.xml", "start": 1419115, "end": 1420957}, {"filename": "/data/help/es/pottery.xml", "start": 1420957, "end": 1422089}, {"filename": "/data/help/es/powerline.xml", "start": 1422089, "end": 1423479}, {"filename": "/data/help/es/powerscoal.xml", "start": 1423479, "end": 1424741}, {"filename": "/data/help/es/powerssolar.xml", "start": 1424741, "end": 1425706}, {"filename": "/data/help/es/query.xml", "start": 1425706, "end": 1426345}, {"filename": "/data/help/es/rail.xml", "start": 1426345, "end": 1427136}, {"filename": "/data/help/es/recycle.xml", "start": 1427136, "end": 1428266}, {"filename": "/data/help/es/residential.xml", "start": 1428266, "end": 1429947}, {"filename": "/data/help/es/river.xml", "start": 1429947, "end": 1431330}, {"filename": "/data/help/es/road.xml", "start": 1431330, "end": 1432160}, {"filename": "/data/help/es/rocket.xml", "start": 1432160, "end": 1434415}, {"filename": "/data/help/es/school.xml", "start": 1434415, "end": 1436025}, {"filename": "/data/help/es/slow.xml", "start": 1436025, "end": 1436482}, {"filename": "/data/help/es/steel.xml", "start": 1436482, "end": 1437872}, {"filename": "/data/help/es/substation.xml", "start": 1437872, "end": 1438776}, {"filename": "/data/help/es/sustain.xml", "start": 1438776, "end": 1440344}, {"filename": "/data/help/es/tech-level.xml", "start": 1440344, "end": 1441750}, {"filename": "/data/help/es/tip.xml", "start": 1441750, "end": 1442799}, {"filename": "/data/help/es/track.xml", "start": 1442799, "end": 1443434}, {"filename": "/data/help/es/transport.xml", "start": 1443434, "end": 1446466}, {"filename": "/data/help/es/university.xml", "start": 1446466, "end": 1447974}, {"filename": "/data/help/es/windmill.xml", "start": 1447974, "end": 1449373}, {"filename": "/data/help/fr/blacksmith.xml", "start": 1449373, "end": 1450573}, {"filename": "/data/help/fr/bulldoze.xml", "start": 1450573, "end": 1451492}, {"filename": "/data/help/fr/button-index.xml", "start": 1451492, "end": 1455988}, {"filename": "/data/help/fr/coal.xml", "start": 1455988, "end": 1457096}, {"filename": "/data/help/fr/coalmine.xml", "start": 1457096, "end": 1458600}, {"filename": "/data/help/fr/commune.xml", "start": 1458600, "end": 1459872}, {"filename": "/data/help/fr/cricket.xml", "start": 1459872, "end": 1461291}, {"filename": "/data/help/fr/dialogs.xml", "start": 1461291, "end": 1461898}, {"filename": "/data/help/fr/economy.xml", "start": 1461898, "end": 1462986}, {"filename": "/data/help/fr/export.xml", "start": 1462986, "end": 1464019}, {"filename": "/data/help/fr/farm.xml", "start": 1464019, "end": 1465364}, {"filename": "/data/help/fr/fast.xml", "start": 1465364, "end": 1465943}, {"filename": "/data/help/fr/finance.xml", "start": 1465943, "end": 1466593}, {"filename": "/data/help/fr/firestation.xml", "start": 1466593, "end": 1468006}, {"filename": "/data/help/fr/food.xml", "start": 1468006, "end": 1468806}, {"filename": "/data/help/fr/goods.xml", "start": 1468806, "end": 1469558}, {"filename": "/data/help/fr/health.xml", "start": 1469558, "end": 1471466}, {"filename": "/data/help/fr/help.xml", "start": 1471466, "end": 1472574}, {"filename": "/data/help/fr/housing.xml", "start": 1472574, "end": 1473719}, {"filename": "/data/help/fr/index.xml", "start": 1473719, "end": 1477424}, {"filename": "/data/help/fr/industryh.xml", "start": 1477424, "end": 1478933}, {"filename": "/data/help/fr/industryl.xml", "start": 1478933, "end": 1480415}, {"filename": "/data/help/fr/keys.xml", "start": 1480415, "end": 1482574}, {"filename": "/data/help/fr/labor.xml", "start": 1482574, "end": 1484038}, {"filename": "/data/help/fr/market.xml", "start": 1484038, "end": 1486042}, {"filename": "/data/help/fr/medium.xml", "start": 1486042, "end": 1486502}, {"filename": "/data/help/fr/mill.xml", "start": 1486502, "end": 1487855}, {"filename": "/data/help/fr/mini-screen.xml", "start": 1487855, "end": 1489116}, {"filename": "/data/help/fr/monument.xml", "start": 1489116, "end": 1490448}, {"filename": "/data/help/fr/msb-coal.xml", "start": 1490448, "end": 1491576}, {"filename": "/data/help/fr/msb-cricket.xml", "start": 1491576, "end": 1492384}, {"filename": "/data/help/fr/msb-fire.xml", "start": 1492384, "end": 1493166}, {"filename": "/data/help/fr/msb-health.xml", "start": 1493166, "end": 1493972}, {"filename": "/data/help/fr/msb-normal.xml", "start": 1493972, "end": 1494553}, {"filename": "/data/help/fr/msb-pol.xml", "start": 1494553, "end": 1495540}, {"filename": "/data/help/fr/msb-power.xml", "start": 1495540, "end": 1496916}, {"filename": "/data/help/fr/msb-starve.xml", "start": 1496916, "end": 1498090}, {"filename": "/data/help/fr/msb-transport.xml", "start": 1498090, "end": 1498871}, {"filename": "/data/help/fr/msb-ub40.xml", "start": 1498871, "end": 1499820}, {"filename": "/data/help/fr/ore.xml", "start": 1499820, "end": 1500528}, {"filename": "/data/help/fr/oremine.xml", "start": 1500528, "end": 1501676}, {"filename": "/data/help/fr/other-costs.xml", "start": 1501676, "end": 1502057}, {"filename": "/data/help/fr/park.xml", "start": 1502057, "end": 1503370}, {"filename": "/data/help/fr/pause.xml", "start": 1503370, "end": 1503649}, {"filename": "/data/help/fr/pbar.xml", "start": 1503649, "end": 1504146}, {"filename": "/data/help/fr/pollution.xml", "start": 1504146, "end": 1505619}, {"filename": "/data/help/fr/port.xml", "start": 1505619, "end": 1507241}, {"filename": "/data/help/fr/pottery.xml", "start": 1507241, "end": 1508309}, {"filename": "/data/help/fr/powerline.xml", "start": 1508309, "end": 1509865}, {"filename": "/data/help/fr/powerscoal.xml", "start": 1509865, "end": 1511089}, {"filename": "/data/help/fr/powerssolar.xml", "start": 1511089, "end": 1512138}, {"filename": "/data/help/fr/query.xml", "start": 1512138, "end": 1512791}, {"filename": "/data/help/fr/rail.xml", "start": 1512791, "end": 1513543}, {"filename": "/data/help/fr/recycle.xml", "start": 1513543, "end": 1514813}, {"filename": "/data/help/fr/residential.xml", "start": 1514813, "end": 1516689}, {"filename": "/data/help/fr/river.xml", "start": 1516689, "end": 1517849}, {"filename": "/data/help/fr/road.xml", "start": 1517849, "end": 1518637}, {"filename": "/data/help/fr/rocket.xml", "start": 1518637, "end": 1520960}, {"filename": "/data/help/fr/school.xml", "start": 1520960, "end": 1522430}, {"filename": "/data/help/fr/slow.xml", "start": 1522430, "end": 1522869}, {"filename": "/data/help/fr/steel.xml", "start": 1522869, "end": 1523932}, {"filename": "/data/help/fr/substation.xml", "start": 1523932, "end": 1524964}, {"filename": "/data/help/fr/sustain.xml", "start": 1524964, "end": 1526979}, {"filename": "/data/help/fr/tech-level.xml", "start": 1526979, "end": 1528618}, {"filename": "/data/help/fr/tip.xml", "start": 1528618, "end": 1529966}, {"filename": "/data/help/fr/track.xml", "start": 1529966, "end": 1530550}, {"filename": "/data/help/fr/transport.xml", "start": 1530550, "end": 1533474}, {"filename": "/data/help/fr/tutorial-advanced.xml", "start": 1533474, "end": 1534933}, {"filename": "/data/help/fr/tutorial-aim.xml", "start": 1534933, "end": 1536253}, {"filename": "/data/help/fr/tutorial-basics.xml", "start": 1536253, "end": 1541257}, {"filename": "/data/help/fr/tutorial-overview.xml", "start": 1541257, "end": 1542619}, {"filename": "/data/help/fr/tutorial-scenario.xml", "start": 1542619, "end": 1543684}, {"filename": "/data/help/fr/tutorial.xml", "start": 1543684, "end": 1544110}, {"filename": "/data/help/fr/university.xml", "start": 1544110, "end": 1545513}, {"filename": "/data/help/fr/waterwell.xml", "start": 1545513, "end": 1546105}, {"filename": "/data/help/fr/windmill.xml", "start": 1546105, "end": 1547234}, {"filename": "/data/help/gd/blacksmith.xml", "start": 1547234, "end": 1548505}, {"filename": "/data/help/gd/bulldoze.xml", "start": 1548505, "end": 1549641}, {"filename": "/data/help/gd/button-index.xml", "start": 1549641, "end": 1554373}, {"filename": "/data/help/gd/coal.xml", "start": 1554373, "end": 1555541}, {"filename": "/data/help/gd/coalmine.xml", "start": 1555541, "end": 1557249}, {"filename": "/data/help/gd/commodities.xml", "start": 1557249, "end": 1558583}, {"filename": "/data/help/gd/commune.xml", "start": 1558583, "end": 1559997}, {"filename": "/data/help/gd/cricket.xml", "start": 1559997, "end": 1561656}, {"filename": "/data/help/gd/dialogs.xml", "start": 1561656, "end": 1562235}, {"filename": "/data/help/gd/economy.xml", "start": 1562235, "end": 1563460}, {"filename": "/data/help/gd/evacuate.xml", "start": 1563460, "end": 1564499}, {"filename": "/data/help/gd/export.xml", "start": 1564499, "end": 1565707}, {"filename": "/data/help/gd/farm.xml", "start": 1565707, "end": 1567141}, {"filename": "/data/help/gd/fast.xml", "start": 1567141, "end": 1567979}, {"filename": "/data/help/gd/finance.xml", "start": 1567979, "end": 1568832}, {"filename": "/data/help/gd/firestation.xml", "start": 1568832, "end": 1570609}, {"filename": "/data/help/gd/food.xml", "start": 1570609, "end": 1571408}, {"filename": "/data/help/gd/goods.xml", "start": 1571408, "end": 1572207}, {"filename": "/data/help/gd/health.xml", "start": 1572207, "end": 1573953}, {"filename": "/data/help/gd/help.xml", "start": 1573953, "end": 1575150}, {"filename": "/data/help/gd/housing.xml", "start": 1575150, "end": 1576419}, {"filename": "/data/help/gd/index.xml", "start": 1576419, "end": 1580417}, {"filename": "/data/help/gd/industryh.xml", "start": 1580417, "end": 1581828}, {"filename": "/data/help/gd/industryl.xml", "start": 1581828, "end": 1583272}, {"filename": "/data/help/gd/keys.xml", "start": 1583272, "end": 1585537}, {"filename": "/data/help/gd/labor.xml", "start": 1585537, "end": 1587139}, {"filename": "/data/help/gd/market.xml", "start": 1587139, "end": 1589682}, {"filename": "/data/help/gd/medium.xml", "start": 1589682, "end": 1590126}, {"filename": "/data/help/gd/mill.xml", "start": 1590126, "end": 1591502}, {"filename": "/data/help/gd/mini-screen.xml", "start": 1591502, "end": 1592886}, {"filename": "/data/help/gd/monument.xml", "start": 1592886, "end": 1594418}, {"filename": "/data/help/gd/msb-coal.xml", "start": 1594418, "end": 1595935}, {"filename": "/data/help/gd/msb-cricket.xml", "start": 1595935, "end": 1597326}, {"filename": "/data/help/gd/msb-fire.xml", "start": 1597326, "end": 1598737}, {"filename": "/data/help/gd/msb-health.xml", "start": 1598737, "end": 1600137}, {"filename": "/data/help/gd/msb-normal.xml", "start": 1600137, "end": 1601388}, {"filename": "/data/help/gd/msb-pol.xml", "start": 1601388, "end": 1602920}, {"filename": "/data/help/gd/msb-power.xml", "start": 1602920, "end": 1604283}, {"filename": "/data/help/gd/msb-starve.xml", "start": 1604283, "end": 1605762}, {"filename": "/data/help/gd/msb-transport.xml", "start": 1605762, "end": 1607501}, {"filename": "/data/help/gd/msb-ub40.xml", "start": 1607501, "end": 1608889}, {"filename": "/data/help/gd/ore.xml", "start": 1608889, "end": 1609704}, {"filename": "/data/help/gd/oremine.xml", "start": 1609704, "end": 1611013}, {"filename": "/data/help/gd/other-costs.xml", "start": 1611013, "end": 1611806}, {"filename": "/data/help/gd/park.xml", "start": 1611806, "end": 1613348}, {"filename": "/data/help/gd/pause.xml", "start": 1613348, "end": 1613615}, {"filename": "/data/help/gd/pbar.xml", "start": 1613615, "end": 1614515}, {"filename": "/data/help/gd/pollution.xml", "start": 1614515, "end": 1616043}, {"filename": "/data/help/gd/port.xml", "start": 1616043, "end": 1617900}, {"filename": "/data/help/gd/pottery.xml", "start": 1617900, "end": 1618846}, {"filename": "/data/help/gd/power.xml", "start": 1618846, "end": 1620164}, {"filename": "/data/help/gd/powerline.xml", "start": 1620164, "end": 1621742}, {"filename": "/data/help/gd/powerscoal.xml", "start": 1621742, "end": 1623282}, {"filename": "/data/help/gd/powerssolar.xml", "start": 1623282, "end": 1624409}, {"filename": "/data/help/gd/query.xml", "start": 1624409, "end": 1625243}, {"filename": "/data/help/gd/rail.xml", "start": 1625243, "end": 1625952}, {"filename": "/data/help/gd/recycle.xml", "start": 1625952, "end": 1627044}, {"filename": "/data/help/gd/residential.xml", "start": 1627044, "end": 1629326}, {"filename": "/data/help/gd/river.xml", "start": 1629326, "end": 1630745}, {"filename": "/data/help/gd/road.xml", "start": 1630745, "end": 1631455}, {"filename": "/data/help/gd/rocket.xml", "start": 1631455, "end": 1633596}, {"filename": "/data/help/gd/school.xml", "start": 1633596, "end": 1635055}, {"filename": "/data/help/gd/slow.xml", "start": 1635055, "end": 1635528}, {"filename": "/data/help/gd/steel.xml", "start": 1635528, "end": 1636785}, {"filename": "/data/help/gd/substation.xml", "start": 1636785, "end": 1637853}, {"filename": "/data/help/gd/sustain.xml", "start": 1637853, "end": 1639687}, {"filename": "/data/help/gd/tech-level.xml", "start": 1639687, "end": 1641316}, {"filename": "/data/help/gd/tip.xml", "start": 1641316, "end": 1642577}, {"filename": "/data/help/gd/track.xml", "start": 1642577, "end": 1643151}, {"filename": "/data/help/gd/transport.xml", "start": 1643151, "end": 1645160}, {"filename": "/data/help/gd/tutorial-advanced.xml", "start": 1645160, "end": 1646655}, {"filename": "/data/help/gd/tutorial-aim.xml", "start": 1646655, "end": 1647906}, {"filename": "/data/help/gd/tutorial-basics.xml", "start": 1647906, "end": 1652553}, {"filename": "/data/help/gd/tutorial-overview.xml", "start": 1652553, "end": 1653885}, {"filename": "/data/help/gd/tutorial-scenario.xml", "start": 1653885, "end": 1654863}, {"filename": "/data/help/gd/tutorial.xml", "start": 1654863, "end": 1655275}, {"filename": "/data/help/gd/university.xml", "start": 1655275, "end": 1656735}, {"filename": "/data/help/gd/waste.xml", "start": 1656735, "end": 1657591}, {"filename": "/data/help/gd/water.xml", "start": 1657591, "end": 1658242}, {"filename": "/data/help/gd/waterwell.xml", "start": 1658242, "end": 1658993}, {"filename": "/data/help/gd/windmill.xml", "start": 1658993, "end": 1660785}, {"filename": "/data/help/gl/blacksmith.xml", "start": 1660785, "end": 1661974}, {"filename": "/data/help/gl/bulldoze.xml", "start": 1661974, "end": 1662856}, {"filename": "/data/help/gl/button-index.xml", "start": 1662856, "end": 1667503}, {"filename": "/data/help/gl/coal.xml", "start": 1667503, "end": 1668569}, {"filename": "/data/help/gl/coalmine.xml", "start": 1668569, "end": 1670002}, {"filename": "/data/help/gl/commune.xml", "start": 1670002, "end": 1671220}, {"filename": "/data/help/gl/cricket.xml", "start": 1671220, "end": 1672900}, {"filename": "/data/help/gl/dialogs.xml", "start": 1672900, "end": 1673528}, {"filename": "/data/help/gl/economy.xml", "start": 1673528, "end": 1674594}, {"filename": "/data/help/gl/export.xml", "start": 1674594, "end": 1675754}, {"filename": "/data/help/gl/farm.xml", "start": 1675754, "end": 1677305}, {"filename": "/data/help/gl/fast.xml", "start": 1677305, "end": 1677789}, {"filename": "/data/help/gl/finance.xml", "start": 1677789, "end": 1678532}, {"filename": "/data/help/gl/firestation.xml", "start": 1678532, "end": 1680277}, {"filename": "/data/help/gl/food.xml", "start": 1680277, "end": 1680974}, {"filename": "/data/help/gl/goods.xml", "start": 1680974, "end": 1681691}, {"filename": "/data/help/gl/health.xml", "start": 1681691, "end": 1683687}, {"filename": "/data/help/gl/help.xml", "start": 1683687, "end": 1684841}, {"filename": "/data/help/gl/housing.xml", "start": 1684841, "end": 1685923}, {"filename": "/data/help/gl/index.xml", "start": 1685923, "end": 1689763}, {"filename": "/data/help/gl/industryh.xml", "start": 1689763, "end": 1691365}, {"filename": "/data/help/gl/industryl.xml", "start": 1691365, "end": 1692850}, {"filename": "/data/help/gl/keys.xml", "start": 1692850, "end": 1695124}, {"filename": "/data/help/gl/labor.xml", "start": 1695124, "end": 1696805}, {"filename": "/data/help/gl/market.xml", "start": 1696805, "end": 1699830}, {"filename": "/data/help/gl/medium.xml", "start": 1699830, "end": 1700264}, {"filename": "/data/help/gl/mill.xml", "start": 1700264, "end": 1701737}, {"filename": "/data/help/gl/mini-screen.xml", "start": 1701737, "end": 1703006}, {"filename": "/data/help/gl/monument.xml", "start": 1703006, "end": 1704513}, {"filename": "/data/help/gl/msb-coal.xml", "start": 1704513, "end": 1706004}, {"filename": "/data/help/gl/msb-cricket.xml", "start": 1706004, "end": 1707350}, {"filename": "/data/help/gl/msb-fire.xml", "start": 1707350, "end": 1708724}, {"filename": "/data/help/gl/msb-health.xml", "start": 1708724, "end": 1710400}, {"filename": "/data/help/gl/msb-normal.xml", "start": 1710400, "end": 1711608}, {"filename": "/data/help/gl/msb-pol.xml", "start": 1711608, "end": 1713106}, {"filename": "/data/help/gl/msb-power.xml", "start": 1713106, "end": 1714525}, {"filename": "/data/help/gl/msb-starve.xml", "start": 1714525, "end": 1715930}, {"filename": "/data/help/gl/msb-transport.xml", "start": 1715930, "end": 1717095}, {"filename": "/data/help/gl/msb-ub40.xml", "start": 1717095, "end": 1718439}, {"filename": "/data/help/gl/ore.xml", "start": 1718439, "end": 1719132}, {"filename": "/data/help/gl/oremine.xml", "start": 1719132, "end": 1720301}, {"filename": "/data/help/gl/other-costs.xml", "start": 1720301, "end": 1721058}, {"filename": "/data/help/gl/park.xml", "start": 1721058, "end": 1722302}, {"filename": "/data/help/gl/pause.xml", "start": 1722302, "end": 1722550}, {"filename": "/data/help/gl/pbar.xml", "start": 1722550, "end": 1723028}, {"filename": "/data/help/gl/pollution.xml", "start": 1723028, "end": 1724423}, {"filename": "/data/help/gl/port.xml", "start": 1724423, "end": 1726041}, {"filename": "/data/help/gl/pottery.xml", "start": 1726041, "end": 1727115}, {"filename": "/data/help/gl/powerline.xml", "start": 1727115, "end": 1728469}, {"filename": "/data/help/gl/powerscoal.xml", "start": 1728469, "end": 1729635}, {"filename": "/data/help/gl/powerssolar.xml", "start": 1729635, "end": 1730830}, {"filename": "/data/help/gl/query.xml", "start": 1730830, "end": 1731418}, {"filename": "/data/help/gl/rail.xml", "start": 1731418, "end": 1732184}, {"filename": "/data/help/gl/recycle.xml", "start": 1732184, "end": 1733237}, {"filename": "/data/help/gl/residential.xml", "start": 1733237, "end": 1735008}, {"filename": "/data/help/gl/river.xml", "start": 1735008, "end": 1736545}, {"filename": "/data/help/gl/road.xml", "start": 1736545, "end": 1737318}, {"filename": "/data/help/gl/rocket.xml", "start": 1737318, "end": 1739402}, {"filename": "/data/help/gl/school.xml", "start": 1739402, "end": 1740824}, {"filename": "/data/help/gl/slow.xml", "start": 1740824, "end": 1741278}, {"filename": "/data/help/gl/steel.xml", "start": 1741278, "end": 1742618}, {"filename": "/data/help/gl/substation.xml", "start": 1742618, "end": 1743503}, {"filename": "/data/help/gl/sustain.xml", "start": 1743503, "end": 1745112}, {"filename": "/data/help/gl/tech-level.xml", "start": 1745112, "end": 1746727}, {"filename": "/data/help/gl/tip.xml", "start": 1746727, "end": 1747739}, {"filename": "/data/help/gl/track.xml", "start": 1747739, "end": 1748348}, {"filename": "/data/help/gl/transport.xml", "start": 1748348, "end": 1751034}, {"filename": "/data/help/gl/tutorial-advanced.xml", "start": 1751034, "end": 1752379}, {"filename": "/data/help/gl/tutorial-aim.xml", "start": 1752379, "end": 1753475}, {"filename": "/data/help/gl/tutorial-basics.xml", "start": 1753475, "end": 1757843}, {"filename": "/data/help/gl/tutorial-overview.xml", "start": 1757843, "end": 1759149}, {"filename": "/data/help/gl/tutorial-scenario.xml", "start": 1759149, "end": 1759760}, {"filename": "/data/help/gl/tutorial.xml", "start": 1759760, "end": 1760192}, {"filename": "/data/help/gl/university.xml", "start": 1760192, "end": 1761676}, {"filename": "/data/help/gl/waterwell.xml", "start": 1761676, "end": 1762182}, {"filename": "/data/help/gl/windmill.xml", "start": 1762182, "end": 1764149}, {"filename": "/data/help/nl/blacksmith.xml", "start": 1764149, "end": 1765283}, {"filename": "/data/help/nl/bulldoze.xml", "start": 1765283, "end": 1766278}, {"filename": "/data/help/nl/button-index.xml", "start": 1766278, "end": 1770845}, {"filename": "/data/help/nl/coal.xml", "start": 1770845, "end": 1772055}, {"filename": "/data/help/nl/coalmine.xml", "start": 1772055, "end": 1773459}, {"filename": "/data/help/nl/commune.xml", "start": 1773459, "end": 1774799}, {"filename": "/data/help/nl/cricket.xml", "start": 1774799, "end": 1776410}, {"filename": "/data/help/nl/dialogs.xml", "start": 1776410, "end": 1776987}, {"filename": "/data/help/nl/economy.xml", "start": 1776987, "end": 1778105}, {"filename": "/data/help/nl/export.xml", "start": 1778105, "end": 1779352}, {"filename": "/data/help/nl/farm.xml", "start": 1779352, "end": 1780781}, {"filename": "/data/help/nl/fast.xml", "start": 1780781, "end": 1781265}, {"filename": "/data/help/nl/finance.xml", "start": 1781265, "end": 1782200}, {"filename": "/data/help/nl/firestation.xml", "start": 1782200, "end": 1783878}, {"filename": "/data/help/nl/food.xml", "start": 1783878, "end": 1784648}, {"filename": "/data/help/nl/goods.xml", "start": 1784648, "end": 1785417}, {"filename": "/data/help/nl/health.xml", "start": 1785417, "end": 1787420}, {"filename": "/data/help/nl/help.xml", "start": 1787420, "end": 1788417}, {"filename": "/data/help/nl/housing.xml", "start": 1788417, "end": 1789627}, {"filename": "/data/help/nl/index.xml", "start": 1789627, "end": 1793335}, {"filename": "/data/help/nl/industryh.xml", "start": 1793335, "end": 1794891}, {"filename": "/data/help/nl/industryl.xml", "start": 1794891, "end": 1796036}, {"filename": "/data/help/nl/keys.xml", "start": 1796036, "end": 1798225}, {"filename": "/data/help/nl/labor.xml", "start": 1798225, "end": 1799663}, {"filename": "/data/help/nl/market.xml", "start": 1799663, "end": 1803169}, {"filename": "/data/help/nl/medium.xml", "start": 1803169, "end": 1803640}, {"filename": "/data/help/nl/mill.xml", "start": 1803640, "end": 1805135}, {"filename": "/data/help/nl/mini-screen.xml", "start": 1805135, "end": 1806290}, {"filename": "/data/help/nl/monument.xml", "start": 1806290, "end": 1807843}, {"filename": "/data/help/nl/msb-coal.xml", "start": 1807843, "end": 1809236}, {"filename": "/data/help/nl/msb-cricket.xml", "start": 1809236, "end": 1810366}, {"filename": "/data/help/nl/msb-fire.xml", "start": 1810366, "end": 1811572}, {"filename": "/data/help/nl/msb-health.xml", "start": 1811572, "end": 1812745}, {"filename": "/data/help/nl/msb-normal.xml", "start": 1812745, "end": 1813800}, {"filename": "/data/help/nl/msb-pol.xml", "start": 1813800, "end": 1815119}, {"filename": "/data/help/nl/msb-power.xml", "start": 1815119, "end": 1816424}, {"filename": "/data/help/nl/msb-starve.xml", "start": 1816424, "end": 1817708}, {"filename": "/data/help/nl/msb-transport.xml", "start": 1817708, "end": 1818958}, {"filename": "/data/help/nl/msb-ub40.xml", "start": 1818958, "end": 1820211}, {"filename": "/data/help/nl/ore.xml", "start": 1820211, "end": 1820888}, {"filename": "/data/help/nl/oremine.xml", "start": 1820888, "end": 1821980}, {"filename": "/data/help/nl/other-costs.xml", "start": 1821980, "end": 1822755}, {"filename": "/data/help/nl/park.xml", "start": 1822755, "end": 1824007}, {"filename": "/data/help/nl/pause.xml", "start": 1824007, "end": 1824265}, {"filename": "/data/help/nl/pbar.xml", "start": 1824265, "end": 1824593}, {"filename": "/data/help/nl/pollution.xml", "start": 1824593, "end": 1826041}, {"filename": "/data/help/nl/port.xml", "start": 1826041, "end": 1827787}, {"filename": "/data/help/nl/pottery.xml", "start": 1827787, "end": 1828725}, {"filename": "/data/help/nl/powerline.xml", "start": 1828725, "end": 1830238}, {"filename": "/data/help/nl/powerscoal.xml", "start": 1830238, "end": 1831196}, {"filename": "/data/help/nl/powerssolar.xml", "start": 1831196, "end": 1832357}, {"filename": "/data/help/nl/query.xml", "start": 1832357, "end": 1832923}, {"filename": "/data/help/nl/rail.xml", "start": 1832923, "end": 1833760}, {"filename": "/data/help/nl/recycle.xml", "start": 1833760, "end": 1834795}, {"filename": "/data/help/nl/residential.xml", "start": 1834795, "end": 1836578}, {"filename": "/data/help/nl/river.xml", "start": 1836578, "end": 1837905}, {"filename": "/data/help/nl/road.xml", "start": 1837905, "end": 1838663}, {"filename": "/data/help/nl/rocket.xml", "start": 1838663, "end": 1840754}, {"filename": "/data/help/nl/school.xml", "start": 1840754, "end": 1842186}, {"filename": "/data/help/nl/slow.xml", "start": 1842186, "end": 1842655}, {"filename": "/data/help/nl/steel.xml", "start": 1842655, "end": 1844078}, {"filename": "/data/help/nl/substation.xml", "start": 1844078, "end": 1844978}, {"filename": "/data/help/nl/sustain.xml", "start": 1844978, "end": 1846718}, {"filename": "/data/help/nl/tech-level.xml", "start": 1846718, "end": 1848273}, {"filename": "/data/help/nl/tip.xml", "start": 1848273, "end": 1849279}, {"filename": "/data/help/nl/track.xml", "start": 1849279, "end": 1849942}, {"filename": "/data/help/nl/transport.xml", "start": 1849942, "end": 1853142}, {"filename": "/data/help/nl/tutorial-advanced.xml", "start": 1853142, "end": 1854568}, {"filename": "/data/help/nl/tutorial-aim.xml", "start": 1854568, "end": 1855730}, {"filename": "/data/help/nl/tutorial-basics.xml", "start": 1855730, "end": 1861144}, {"filename": "/data/help/nl/tutorial-overview.xml", "start": 1861144, "end": 1862402}, {"filename": "/data/help/nl/tutorial-scenario.xml", "start": 1862402, "end": 1863376}, {"filename": "/data/help/nl/tutorial.xml", "start": 1863376, "end": 1872272}, {"filename": "/data/help/nl/university.xml", "start": 1872272, "end": 1873732}, {"filename": "/data/help/nl/waterwell.xml", "start": 1873732, "end": 1874151}, {"filename": "/data/help/nl/windmill.xml", "start": 1874151, "end": 1876016}, {"filename": "/data/help/pt_BR/blacksmith.xml", "start": 1876016, "end": 1877170}, {"filename": "/data/help/pt_BR/bulldoze.xml", "start": 1877170, "end": 1878086}, {"filename": "/data/help/pt_BR/button-index.xml", "start": 1878086, "end": 1882672}, {"filename": "/data/help/pt_BR/coal.xml", "start": 1882672, "end": 1883810}, {"filename": "/data/help/pt_BR/coalmine.xml", "start": 1883810, "end": 1885239}, {"filename": "/data/help/pt_BR/commune.xml", "start": 1885239, "end": 1886582}, {"filename": "/data/help/pt_BR/cricket.xml", "start": 1886582, "end": 1888264}, {"filename": "/data/help/pt_BR/dialogs.xml", "start": 1888264, "end": 1888826}, {"filename": "/data/help/pt_BR/economy.xml", "start": 1888826, "end": 1890118}, {"filename": "/data/help/pt_BR/export.xml", "start": 1890118, "end": 1891342}, {"filename": "/data/help/pt_BR/farm.xml", "start": 1891342, "end": 1892634}, {"filename": "/data/help/pt_BR/fast.xml", "start": 1892634, "end": 1893459}, {"filename": "/data/help/pt_BR/finance.xml", "start": 1893459, "end": 1894207}, {"filename": "/data/help/pt_BR/firestation.xml", "start": 1894207, "end": 1895934}, {"filename": "/data/help/pt_BR/food.xml", "start": 1895934, "end": 1896635}, {"filename": "/data/help/pt_BR/goods.xml", "start": 1896635, "end": 1897311}, {"filename": "/data/help/pt_BR/health.xml", "start": 1897311, "end": 1899348}, {"filename": "/data/help/pt_BR/help.xml", "start": 1899348, "end": 1900528}, {"filename": "/data/help/pt_BR/housing.xml", "start": 1900528, "end": 1901880}, {"filename": "/data/help/pt_BR/index.xml", "start": 1901880, "end": 1905712}, {"filename": "/data/help/pt_BR/industryh.xml", "start": 1905712, "end": 1907127}, {"filename": "/data/help/pt_BR/industryl.xml", "start": 1907127, "end": 1908598}, {"filename": "/data/help/pt_BR/keys.xml", "start": 1908598, "end": 1910551}, {"filename": "/data/help/pt_BR/labor.xml", "start": 1910551, "end": 1912173}, {"filename": "/data/help/pt_BR/market.xml", "start": 1912173, "end": 1915214}, {"filename": "/data/help/pt_BR/medium.xml", "start": 1915214, "end": 1915702}, {"filename": "/data/help/pt_BR/mill.xml", "start": 1915702, "end": 1917156}, {"filename": "/data/help/pt_BR/mini-screen.xml", "start": 1917156, "end": 1918517}, {"filename": "/data/help/pt_BR/monument.xml", "start": 1918517, "end": 1920183}, {"filename": "/data/help/pt_BR/msb-coal.xml", "start": 1920183, "end": 1921752}, {"filename": "/data/help/pt_BR/msb-cricket.xml", "start": 1921752, "end": 1923127}, {"filename": "/data/help/pt_BR/msb-fire.xml", "start": 1923127, "end": 1924511}, {"filename": "/data/help/pt_BR/msb-health.xml", "start": 1924511, "end": 1926198}, {"filename": "/data/help/pt_BR/msb-normal.xml", "start": 1926198, "end": 1927424}, {"filename": "/data/help/pt_BR/msb-pol.xml", "start": 1927424, "end": 1928939}, {"filename": "/data/help/pt_BR/msb-power.xml", "start": 1928939, "end": 1930369}, {"filename": "/data/help/pt_BR/msb-starve.xml", "start": 1930369, "end": 1931924}, {"filename": "/data/help/pt_BR/msb-transport.xml", "start": 1931924, "end": 1933328}, {"filename": "/data/help/pt_BR/msb-ub40.xml", "start": 1933328, "end": 1934723}, {"filename": "/data/help/pt_BR/ore.xml", "start": 1934723, "end": 1935384}, {"filename": "/data/help/pt_BR/oremine.xml", "start": 1935384, "end": 1936470}, {"filename": "/data/help/pt_BR/other-costs.xml", "start": 1936470, "end": 1937310}, {"filename": "/data/help/pt_BR/park.xml", "start": 1937310, "end": 1938561}, {"filename": "/data/help/pt_BR/pause.xml", "start": 1938561, "end": 1938808}, {"filename": "/data/help/pt_BR/pbar.xml", "start": 1938808, "end": 1939303}, {"filename": "/data/help/pt_BR/pollution.xml", "start": 1939303, "end": 1940772}, {"filename": "/data/help/pt_BR/port.xml", "start": 1940772, "end": 1942582}, {"filename": "/data/help/pt_BR/pottery.xml", "start": 1942582, "end": 1943524}, {"filename": "/data/help/pt_BR/powerline.xml", "start": 1943524, "end": 1944955}, {"filename": "/data/help/pt_BR/powerscoal.xml", "start": 1944955, "end": 1946028}, {"filename": "/data/help/pt_BR/powerssolar.xml", "start": 1946028, "end": 1947111}, {"filename": "/data/help/pt_BR/query.xml", "start": 1947111, "end": 1947716}, {"filename": "/data/help/pt_BR/rail.xml", "start": 1947716, "end": 1948489}, {"filename": "/data/help/pt_BR/recycle.xml", "start": 1948489, "end": 1949553}, {"filename": "/data/help/pt_BR/residential.xml", "start": 1949553, "end": 1951400}, {"filename": "/data/help/pt_BR/river.xml", "start": 1951400, "end": 1952813}, {"filename": "/data/help/pt_BR/road.xml", "start": 1952813, "end": 1953575}, {"filename": "/data/help/pt_BR/rocket.xml", "start": 1953575, "end": 1955751}, {"filename": "/data/help/pt_BR/school.xml", "start": 1955751, "end": 1957144}, {"filename": "/data/help/pt_BR/slow.xml", "start": 1957144, "end": 1957622}, {"filename": "/data/help/pt_BR/steel.xml", "start": 1957622, "end": 1958891}, {"filename": "/data/help/pt_BR/substation.xml", "start": 1958891, "end": 1959785}, {"filename": "/data/help/pt_BR/sustain.xml", "start": 1959785, "end": 1961506}, {"filename": "/data/help/pt_BR/tech-level.xml", "start": 1961506, "end": 1963202}, {"filename": "/data/help/pt_BR/tip.xml", "start": 1963202, "end": 1964264}, {"filename": "/data/help/pt_BR/track.xml", "start": 1964264, "end": 1964862}, {"filename": "/data/help/pt_BR/transport.xml", "start": 1964862, "end": 1967415}, {"filename": "/data/help/pt_BR/tutorial-advanced.xml", "start": 1967415, "end": 1968791}, {"filename": "/data/help/pt_BR/tutorial-aim.xml", "start": 1968791, "end": 1969925}, {"filename": "/data/help/pt_BR/tutorial-basics.xml", "start": 1969925, "end": 1974354}, {"filename": "/data/help/pt_BR/tutorial-overview.xml", "start": 1974354, "end": 1975536}, {"filename": "/data/help/pt_BR/tutorial-scenario.xml", "start": 1975536, "end": 1976138}, {"filename": "/data/help/pt_BR/tutorial.xml", "start": 1976138, "end": 1976559}, {"filename": "/data/help/pt_BR/university.xml", "start": 1976559, "end": 1978005}, {"filename": "/data/help/pt_BR/waterwell.xml", "start": 1978005, "end": 1978451}, {"filename": "/data/help/pt_BR/windmill.xml", "start": 1978451, "end": 1980381}, {"filename": "/data/help/ru/blacksmith.xml", "start": 1980381, "end": 1981989}, {"filename": "/data/help/ru/bulldoze.xml", "start": 1981989, "end": 1983800}, {"filename": "/data/help/ru/button-index.xml", "start": 1983800, "end": 1988858}, {"filename": "/data/help/ru/coal.xml", "start": 1988858, "end": 1990784}, {"filename": "/data/help/ru/coalmine.xml", "start": 1990784, "end": 1993252}, {"filename": "/data/help/ru/commodities.xml", "start": 1993252, "end": 1995143}, {"filename": "/data/help/ru/commune.xml", "start": 1995143, "end": 1997306}, {"filename": "/data/help/ru/cricket.xml", "start": 1997306, "end": 1999876}, {"filename": "/data/help/ru/dialogs.xml", "start": 1999876, "end": 2000745}, {"filename": "/data/help/ru/economy.xml", "start": 2000745, "end": 2002452}, {"filename": "/data/help/ru/evacuate.xml", "start": 2002452, "end": 2003885}, {"filename": "/data/help/ru/export.xml", "start": 2003885, "end": 2005864}, {"filename": "/data/help/ru/farm.xml", "start": 2005864, "end": 2007974}, {"filename": "/data/help/ru/fast.xml", "start": 2007974, "end": 2009150}, {"filename": "/data/help/ru/finance.xml", "start": 2009150, "end": 2010258}, {"filename": "/data/help/ru/firestation.xml", "start": 2010258, "end": 2012770}, {"filename": "/data/help/ru/food.xml", "start": 2012770, "end": 2013914}, {"filename": "/data/help/ru/goods.xml", "start": 2013914, "end": 2015048}, {"filename": "/data/help/ru/health.xml", "start": 2015048, "end": 2017463}, {"filename": "/data/help/ru/help.xml", "start": 2017463, "end": 2019035}, {"filename": "/data/help/ru/housing.xml", "start": 2019035, "end": 2020867}, {"filename": "/data/help/ru/index.xml", "start": 2020867, "end": 2025942}, {"filename": "/data/help/ru/industryh.xml", "start": 2025942, "end": 2028508}, {"filename": "/data/help/ru/industryl.xml", "start": 2028508, "end": 2031214}, {"filename": "/data/help/ru/keys.xml", "start": 2031214, "end": 2033770}, {"filename": "/data/help/ru/labor.xml", "start": 2033770, "end": 2036048}, {"filename": "/data/help/ru/market.xml", "start": 2036048, "end": 2039599}, {"filename": "/data/help/ru/medium.xml", "start": 2039599, "end": 2040285}, {"filename": "/data/help/ru/mill.xml", "start": 2040285, "end": 2042356}, {"filename": "/data/help/ru/mini-screen.xml", "start": 2042356, "end": 2044164}, {"filename": "/data/help/ru/monument.xml", "start": 2044164, "end": 2046709}, {"filename": "/data/help/ru/msb-coal.xml", "start": 2046709, "end": 2048498}, {"filename": "/data/help/ru/msb-cricket.xml", "start": 2048498, "end": 2050049}, {"filename": "/data/help/ru/msb-fire.xml", "start": 2050049, "end": 2051563}, {"filename": "/data/help/ru/msb-health.xml", "start": 2051563, "end": 2053070}, {"filename": "/data/help/ru/msb-normal.xml", "start": 2053070, "end": 2054293}, {"filename": "/data/help/ru/msb-pol.xml", "start": 2054293, "end": 2056198}, {"filename": "/data/help/ru/msb-power.xml", "start": 2056198, "end": 2057716}, {"filename": "/data/help/ru/msb-starve.xml", "start": 2057716, "end": 2059303}, {"filename": "/data/help/ru/msb-transport.xml", "start": 2059303, "end": 2061192}, {"filename": "/data/help/ru/msb-ub40.xml", "start": 2061192, "end": 2062709}, {"filename": "/data/help/ru/ore.xml", "start": 2062709, "end": 2063911}, {"filename": "/data/help/ru/oremine.xml", "start": 2063911, "end": 2065590}, {"filename": "/data/help/ru/other-costs.xml", "start": 2065590, "end": 2066761}, {"filename": "/data/help/ru/park.xml", "start": 2066761, "end": 2068973}, {"filename": "/data/help/ru/pause.xml", "start": 2068973, "end": 2069603}, {"filename": "/data/help/ru/pbar.xml", "start": 2069603, "end": 2070849}, {"filename": "/data/help/ru/pollution.xml", "start": 2070849, "end": 2073117}, {"filename": "/data/help/ru/port.xml", "start": 2073117, "end": 2075665}, {"filename": "/data/help/ru/pottery.xml", "start": 2075665, "end": 2076996}, {"filename": "/data/help/ru/power.xml", "start": 2076996, "end": 2079139}, {"filename": "/data/help/ru/powerline.xml", "start": 2079139, "end": 2081405}, {"filename": "/data/help/ru/powerscoal.xml", "start": 2081405, "end": 2083698}, {"filename": "/data/help/ru/powerssolar.xml", "start": 2083698, "end": 2085189}, {"filename": "/data/help/ru/query.xml", "start": 2085189, "end": 2086022}, {"filename": "/data/help/ru/rail.xml", "start": 2086022, "end": 2087186}, {"filename": "/data/help/ru/recycle.xml", "start": 2087186, "end": 2088725}, {"filename": "/data/help/ru/residential.xml", "start": 2088725, "end": 2091668}, {"filename": "/data/help/ru/river.xml", "start": 2091668, "end": 2093619}, {"filename": "/data/help/ru/road.xml", "start": 2093619, "end": 2094714}, {"filename": "/data/help/ru/rocket.xml", "start": 2094714, "end": 2097991}, {"filename": "/data/help/ru/school.xml", "start": 2097991, "end": 2099977}, {"filename": "/data/help/ru/slow.xml", "start": 2099977, "end": 2100729}, {"filename": "/data/help/ru/steel.xml", "start": 2100729, "end": 2102652}, {"filename": "/data/help/ru/substation.xml", "start": 2102652, "end": 2103980}, {"filename": "/data/help/ru/sustain.xml", "start": 2103980, "end": 2106770}, {"filename": "/data/help/ru/tech-level.xml", "start": 2106770, "end": 2109558}, {"filename": "/data/help/ru/tip.xml", "start": 2109558, "end": 2111203}, {"filename": "/data/help/ru/track.xml", "start": 2111203, "end": 2112103}, {"filename": "/data/help/ru/transport.xml", "start": 2112103, "end": 2115044}, {"filename": "/data/help/ru/tutorial-advanced.xml", "start": 2115044, "end": 2117199}, {"filename": "/data/help/ru/tutorial-aim.xml", "start": 2117199, "end": 2118920}, {"filename": "/data/help/ru/tutorial-basics.xml", "start": 2118920, "end": 2126440}, {"filename": "/data/help/ru/tutorial-overview.xml", "start": 2126440, "end": 2128228}, {"filename": "/data/help/ru/tutorial-scenario.xml", "start": 2128228, "end": 2129815}, {"filename": "/data/help/ru/tutorial.xml", "start": 2129815, "end": 2130433}, {"filename": "/data/help/ru/university.xml", "start": 2130433, "end": 2132698}, {"filename": "/data/help/ru/waste.xml", "start": 2132698, "end": 2133928}, {"filename": "/data/help/ru/water.xml", "start": 2133928, "end": 2134980}, {"filename": "/data/help/ru/waterwell.xml", "start": 2134980, "end": 2136142}, {"filename": "/data/help/ru/windmill.xml", "start": 2136142, "end": 2138449}, {"filename": "/data/help/sv/blacksmith.xml", "start": 2138449, "end": 2139588}, {"filename": "/data/help/sv/bulldoze.xml", "start": 2139588, "end": 2140510}, {"filename": "/data/help/sv/button-index.xml", "start": 2140510, "end": 2144944}, {"filename": "/data/help/sv/coal.xml", "start": 2144944, "end": 2146081}, {"filename": "/data/help/sv/coalmine.xml", "start": 2146081, "end": 2147386}, {"filename": "/data/help/sv/commune.xml", "start": 2147386, "end": 2148543}, {"filename": "/data/help/sv/cricket.xml", "start": 2148543, "end": 2150153}, {"filename": "/data/help/sv/dialogs.xml", "start": 2150153, "end": 2150702}, {"filename": "/data/help/sv/economy.xml", "start": 2150702, "end": 2151838}, {"filename": "/data/help/sv/export.xml", "start": 2151838, "end": 2153190}, {"filename": "/data/help/sv/farm.xml", "start": 2153190, "end": 2154395}, {"filename": "/data/help/sv/fast.xml", "start": 2154395, "end": 2154948}, {"filename": "/data/help/sv/finance.xml", "start": 2154948, "end": 2155929}, {"filename": "/data/help/sv/firestation.xml", "start": 2155929, "end": 2157566}, {"filename": "/data/help/sv/food.xml", "start": 2157566, "end": 2158251}, {"filename": "/data/help/sv/goods.xml", "start": 2158251, "end": 2158925}, {"filename": "/data/help/sv/health.xml", "start": 2158925, "end": 2160881}, {"filename": "/data/help/sv/help.xml", "start": 2160881, "end": 2162038}, {"filename": "/data/help/sv/housing.xml", "start": 2162038, "end": 2163018}, {"filename": "/data/help/sv/index.xml", "start": 2163018, "end": 2166654}, {"filename": "/data/help/sv/industryh.xml", "start": 2166654, "end": 2168015}, {"filename": "/data/help/sv/industryl.xml", "start": 2168015, "end": 2169417}, {"filename": "/data/help/sv/keys.xml", "start": 2169417, "end": 2171351}, {"filename": "/data/help/sv/labor.xml", "start": 2171351, "end": 2172868}, {"filename": "/data/help/sv/market.xml", "start": 2172868, "end": 2174750}, {"filename": "/data/help/sv/medium.xml", "start": 2174750, "end": 2175200}, {"filename": "/data/help/sv/mill.xml", "start": 2175200, "end": 2176538}, {"filename": "/data/help/sv/mini-screen.xml", "start": 2176538, "end": 2177580}, {"filename": "/data/help/sv/monument.xml", "start": 2177580, "end": 2179001}, {"filename": "/data/help/sv/msb-coal.xml", "start": 2179001, "end": 2180375}, {"filename": "/data/help/sv/msb-cricket.xml", "start": 2180375, "end": 2181632}, {"filename": "/data/help/sv/msb-fire.xml", "start": 2181632, "end": 2182877}, {"filename": "/data/help/sv/msb-health.xml", "start": 2182877, "end": 2184430}, {"filename": "/data/help/sv/msb-normal.xml", "start": 2184430, "end": 2185567}, {"filename": "/data/help/sv/msb-pol.xml", "start": 2185567, "end": 2186935}, {"filename": "/data/help/sv/msb-power.xml", "start": 2186935, "end": 2188252}, {"filename": "/data/help/sv/msb-starve.xml", "start": 2188252, "end": 2189492}, {"filename": "/data/help/sv/msb-transport.xml", "start": 2189492, "end": 2190770}, {"filename": "/data/help/sv/msb-ub40.xml", "start": 2190770, "end": 2192023}, {"filename": "/data/help/sv/ore.xml", "start": 2192023, "end": 2192660}, {"filename": "/data/help/sv/oremine.xml", "start": 2192660, "end": 2193691}, {"filename": "/data/help/sv/other-costs.xml", "start": 2193691, "end": 2194577}, {"filename": "/data/help/sv/park.xml", "start": 2194577, "end": 2195708}, {"filename": "/data/help/sv/pause.xml", "start": 2195708, "end": 2195953}, {"filename": "/data/help/sv/pbar.xml", "start": 2195953, "end": 2196432}, {"filename": "/data/help/sv/pollution.xml", "start": 2196432, "end": 2197812}, {"filename": "/data/help/sv/port.xml", "start": 2197812, "end": 2199521}, {"filename": "/data/help/sv/pottery.xml", "start": 2199521, "end": 2200489}, {"filename": "/data/help/sv/powerline.xml", "start": 2200489, "end": 2201756}, {"filename": "/data/help/sv/powerscoal.xml", "start": 2201756, "end": 2202842}, {"filename": "/data/help/sv/powerssolar.xml", "start": 2202842, "end": 2203654}, {"filename": "/data/help/sv/query.xml", "start": 2203654, "end": 2204246}, {"filename": "/data/help/sv/rail.xml", "start": 2204246, "end": 2205010}, {"filename": "/data/help/sv/recycle.xml", "start": 2205010, "end": 2206047}, {"filename": "/data/help/sv/residential.xml", "start": 2206047, "end": 2207672}, {"filename": "/data/help/sv/river.xml", "start": 2207672, "end": 2208901}, {"filename": "/data/help/sv/road.xml", "start": 2208901, "end": 2209654}, {"filename": "/data/help/sv/rocket.xml", "start": 2209654, "end": 2211720}, {"filename": "/data/help/sv/school.xml", "start": 2211720, "end": 2213179}, {"filename": "/data/help/sv/slow.xml", "start": 2213179, "end": 2213636}, {"filename": "/data/help/sv/steel.xml", "start": 2213636, "end": 2214877}, {"filename": "/data/help/sv/substation.xml", "start": 2214877, "end": 2215710}, {"filename": "/data/help/sv/sustain.xml", "start": 2215710, "end": 2217218}, {"filename": "/data/help/sv/tech-level.xml", "start": 2217218, "end": 2218548}, {"filename": "/data/help/sv/tip.xml", "start": 2218548, "end": 2219568}, {"filename": "/data/help/sv/track.xml", "start": 2219568, "end": 2220203}, {"filename": "/data/help/sv/transport.xml", "start": 2220203, "end": 2222909}, {"filename": "/data/help/sv/tutorial-advanced.xml", "start": 2222909, "end": 2224180}, {"filename": "/data/help/sv/tutorial-aim.xml", "start": 2224180, "end": 2225269}, {"filename": "/data/help/sv/tutorial-basics.xml", "start": 2225269, "end": 2229250}, {"filename": "/data/help/sv/tutorial-overview.xml", "start": 2229250, "end": 2230347}, {"filename": "/data/help/sv/tutorial-scenario.xml", "start": 2230347, "end": 2231147}, {"filename": "/data/help/sv/tutorial.xml", "start": 2231147, "end": 2231564}, {"filename": "/data/help/sv/university.xml", "start": 2231564, "end": 2232943}, {"filename": "/data/help/sv/waterwell.xml", "start": 2232943, "end": 2233344}, {"filename": "/data/help/sv/windmill.xml", "start": 2233344, "end": 2234547}, {"filename": "/data/help/tr/blacksmith.xml", "start": 2234547, "end": 2235745}, {"filename": "/data/help/tr/bulldoze.xml", "start": 2235745, "end": 2236773}, {"filename": "/data/help/tr/button-index.xml", "start": 2236773, "end": 2241520}, {"filename": "/data/help/tr/coal.xml", "start": 2241520, "end": 2242679}, {"filename": "/data/help/tr/coalmine.xml", "start": 2242679, "end": 2244302}, {"filename": "/data/help/tr/commune.xml", "start": 2244302, "end": 2245617}, {"filename": "/data/help/tr/cricket.xml", "start": 2245617, "end": 2247306}, {"filename": "/data/help/tr/dialogs.xml", "start": 2247306, "end": 2247908}, {"filename": "/data/help/tr/economy.xml", "start": 2247908, "end": 2249008}, {"filename": "/data/help/tr/export.xml", "start": 2249008, "end": 2250179}, {"filename": "/data/help/tr/farm.xml", "start": 2250179, "end": 2251600}, {"filename": "/data/help/tr/fast.xml", "start": 2251600, "end": 2252090}, {"filename": "/data/help/tr/finance.xml", "start": 2252090, "end": 2252812}, {"filename": "/data/help/tr/firestation.xml", "start": 2252812, "end": 2254462}, {"filename": "/data/help/tr/food.xml", "start": 2254462, "end": 2255221}, {"filename": "/data/help/tr/goods.xml", "start": 2255221, "end": 2255976}, {"filename": "/data/help/tr/health.xml", "start": 2255976, "end": 2257940}, {"filename": "/data/help/tr/help.xml", "start": 2257940, "end": 2259082}, {"filename": "/data/help/tr/housing.xml", "start": 2259082, "end": 2260180}, {"filename": "/data/help/tr/index.xml", "start": 2260180, "end": 2263980}, {"filename": "/data/help/tr/industryh.xml", "start": 2263980, "end": 2265259}, {"filename": "/data/help/tr/industryl.xml", "start": 2265259, "end": 2266717}, {"filename": "/data/help/tr/keys.xml", "start": 2266717, "end": 2269107}, {"filename": "/data/help/tr/labor.xml", "start": 2269107, "end": 2270659}, {"filename": "/data/help/tr/market.xml", "start": 2270659, "end": 2273653}, {"filename": "/data/help/tr/medium.xml", "start": 2273653, "end": 2274076}, {"filename": "/data/help/tr/mill.xml", "start": 2274076, "end": 2275475}, {"filename": "/data/help/tr/mini-screen.xml", "start": 2275475, "end": 2276740}, {"filename": "/data/help/tr/monument.xml", "start": 2276740, "end": 2278287}, {"filename": "/data/help/tr/msb-coal.xml", "start": 2278287, "end": 2279816}, {"filename": "/data/help/tr/msb-cricket.xml", "start": 2279816, "end": 2281222}, {"filename": "/data/help/tr/msb-fire.xml", "start": 2281222, "end": 2282598}, {"filename": "/data/help/tr/msb-health.xml", "start": 2282598, "end": 2284294}, {"filename": "/data/help/tr/msb-normal.xml", "start": 2284294, "end": 2285512}, {"filename": "/data/help/tr/msb-pol.xml", "start": 2285512, "end": 2287008}, {"filename": "/data/help/tr/msb-power.xml", "start": 2287008, "end": 2288460}, {"filename": "/data/help/tr/msb-starve.xml", "start": 2288460, "end": 2289857}, {"filename": "/data/help/tr/msb-transport.xml", "start": 2289857, "end": 2291031}, {"filename": "/data/help/tr/msb-ub40.xml", "start": 2291031, "end": 2292419}, {"filename": "/data/help/tr/ore.xml", "start": 2292419, "end": 2293083}, {"filename": "/data/help/tr/oremine.xml", "start": 2293083, "end": 2294223}, {"filename": "/data/help/tr/other-costs.xml", "start": 2294223, "end": 2295045}, {"filename": "/data/help/tr/park.xml", "start": 2295045, "end": 2296331}, {"filename": "/data/help/tr/pause.xml", "start": 2296331, "end": 2296583}, {"filename": "/data/help/tr/pbar.xml", "start": 2296583, "end": 2297226}, {"filename": "/data/help/tr/pollution.xml", "start": 2297226, "end": 2298618}, {"filename": "/data/help/tr/port.xml", "start": 2298618, "end": 2300389}, {"filename": "/data/help/tr/pottery.xml", "start": 2300389, "end": 2301435}, {"filename": "/data/help/tr/powerline.xml", "start": 2301435, "end": 2302742}, {"filename": "/data/help/tr/powerscoal.xml", "start": 2302742, "end": 2303896}, {"filename": "/data/help/tr/powerssolar.xml", "start": 2303896, "end": 2304996}, {"filename": "/data/help/tr/query.xml", "start": 2304996, "end": 2305547}, {"filename": "/data/help/tr/rail.xml", "start": 2305547, "end": 2306317}, {"filename": "/data/help/tr/recycle.xml", "start": 2306317, "end": 2307399}, {"filename": "/data/help/tr/residential.xml", "start": 2307399, "end": 2309213}, {"filename": "/data/help/tr/river.xml", "start": 2309213, "end": 2310503}, {"filename": "/data/help/tr/road.xml", "start": 2310503, "end": 2311271}, {"filename": "/data/help/tr/rocket.xml", "start": 2311271, "end": 2313257}, {"filename": "/data/help/tr/school.xml", "start": 2313257, "end": 2314678}, {"filename": "/data/help/tr/slow.xml", "start": 2314678, "end": 2315111}, {"filename": "/data/help/tr/steel.xml", "start": 2315111, "end": 2316331}, {"filename": "/data/help/tr/substation.xml", "start": 2316331, "end": 2317132}, {"filename": "/data/help/tr/sustain.xml", "start": 2317132, "end": 2318789}, {"filename": "/data/help/tr/tech-level.xml", "start": 2318789, "end": 2320349}, {"filename": "/data/help/tr/tip.xml", "start": 2320349, "end": 2321398}, {"filename": "/data/help/tr/track.xml", "start": 2321398, "end": 2321989}, {"filename": "/data/help/tr/transport.xml", "start": 2321989, "end": 2324631}, {"filename": "/data/help/tr/tutorial-advanced.xml", "start": 2324631, "end": 2326039}, {"filename": "/data/help/tr/tutorial-aim.xml", "start": 2326039, "end": 2327199}, {"filename": "/data/help/tr/tutorial-basics.xml", "start": 2327199, "end": 2331570}, {"filename": "/data/help/tr/tutorial-overview.xml", "start": 2331570, "end": 2332891}, {"filename": "/data/help/tr/tutorial-scenario.xml", "start": 2332891, "end": 2333741}, {"filename": "/data/help/tr/tutorial.xml", "start": 2333741, "end": 2334181}, {"filename": "/data/help/tr/university.xml", "start": 2334181, "end": 2335597}, {"filename": "/data/help/tr/waterwell.xml", "start": 2335597, "end": 2336036}, {"filename": "/data/help/tr/windmill.xml", "start": 2336036, "end": 2337872}, {"filename": "/data/help_templates/convert.py", "start": 2337872, "end": 2343497}, {"filename": "/data/help_templates/find-help-translation-issues.sh", "start": 2343497, "end": 2345657}, {"filename": "/data/help_templates/orig/blacksmith.tml", "start": 2345657, "end": 2346390}, {"filename": "/data/help_templates/orig/bulldoze.tml", "start": 2346390, "end": 2347101}, {"filename": "/data/help_templates/orig/button-index.tml", "start": 2347101, "end": 2350096}, {"filename": "/data/help_templates/orig/coal.tml", "start": 2350096, "end": 2350747}, {"filename": "/data/help_templates/orig/coalmine.tml", "start": 2350747, "end": 2352469}, {"filename": "/data/help_templates/orig/commodities.tml", "start": 2352469, "end": 2353184}, {"filename": "/data/help_templates/orig/commune.tml", "start": 2353184, "end": 2354407}, {"filename": "/data/help_templates/orig/cricket.tml", "start": 2354407, "end": 2355568}, {"filename": "/data/help_templates/orig/dialogs.tml", "start": 2355568, "end": 2355952}, {"filename": "/data/help_templates/orig/economy.tml", "start": 2355952, "end": 2356890}, {"filename": "/data/help_templates/orig/evacuate.tml", "start": 2356890, "end": 2357527}, {"filename": "/data/help_templates/orig/export.tml", "start": 2357527, "end": 2358248}, {"filename": "/data/help_templates/orig/farm.tml", "start": 2358248, "end": 2359278}, {"filename": "/data/help_templates/orig/fast.tml", "start": 2359278, "end": 2359778}, {"filename": "/data/help_templates/orig/finance.tml", "start": 2359778, "end": 2360305}, {"filename": "/data/help_templates/orig/firestation.tml", "start": 2360305, "end": 2361256}, {"filename": "/data/help_templates/orig/food.tml", "start": 2361256, "end": 2361618}, {"filename": "/data/help_templates/orig/goods.tml", "start": 2361618, "end": 2361954}, {"filename": "/data/help_templates/orig/health.tml", "start": 2361954, "end": 2363110}, {"filename": "/data/help_templates/orig/help.tml", "start": 2363110, "end": 2363750}, {"filename": "/data/help_templates/orig/housing.tml", "start": 2363750, "end": 2364724}, {"filename": "/data/help_templates/orig/index.tml", "start": 2364724, "end": 2365503}, {"filename": "/data/help_templates/orig/industryh.tml", "start": 2365503, "end": 2366540}, {"filename": "/data/help_templates/orig/industryl.tml", "start": 2366540, "end": 2367753}, {"filename": "/data/help_templates/orig/keys.tml", "start": 2367753, "end": 2368935}, {"filename": "/data/help_templates/orig/labor.tml", "start": 2368935, "end": 2370058}, {"filename": "/data/help_templates/orig/market.tml", "start": 2370058, "end": 2372171}, {"filename": "/data/help_templates/orig/medium.tml", "start": 2372171, "end": 2372395}, {"filename": "/data/help_templates/orig/mill.tml", "start": 2372395, "end": 2373267}, {"filename": "/data/help_templates/orig/mini-screen.tml", "start": 2373267, "end": 2373848}, {"filename": "/data/help_templates/orig/monument.tml", "start": 2373848, "end": 2375167}, {"filename": "/data/help_templates/orig/msb-coal.tml", "start": 2375167, "end": 2375926}, {"filename": "/data/help_templates/orig/msb-cricket.tml", "start": 2375926, "end": 2376494}, {"filename": "/data/help_templates/orig/msb-fire.tml", "start": 2376494, "end": 2377052}, {"filename": "/data/help_templates/orig/msb-health.tml", "start": 2377052, "end": 2377615}, {"filename": "/data/help_templates/orig/msb-normal.tml", "start": 2377615, "end": 2378062}, {"filename": "/data/help_templates/orig/msb-pol.tml", "start": 2378062, "end": 2378742}, {"filename": "/data/help_templates/orig/msb-power.tml", "start": 2378742, "end": 2379302}, {"filename": "/data/help_templates/orig/msb-starve.tml", "start": 2379302, "end": 2379950}, {"filename": "/data/help_templates/orig/msb-transport.tml", "start": 2379950, "end": 2380804}, {"filename": "/data/help_templates/orig/msb-ub40.tml", "start": 2380804, "end": 2381627}, {"filename": "/data/help_templates/orig/ore.tml", "start": 2381627, "end": 2381878}, {"filename": "/data/help_templates/orig/oremine.tml", "start": 2381878, "end": 2382895}, {"filename": "/data/help_templates/orig/other-costs.tml", "start": 2382895, "end": 2383340}, {"filename": "/data/help_templates/orig/park.tml", "start": 2383340, "end": 2384134}, {"filename": "/data/help_templates/orig/pause.tml", "start": 2384134, "end": 2384289}, {"filename": "/data/help_templates/orig/pbar.tml", "start": 2384289, "end": 2384766}, {"filename": "/data/help_templates/orig/pollution.tml", "start": 2384766, "end": 2385566}, {"filename": "/data/help_templates/orig/port.tml", "start": 2385566, "end": 2387693}, {"filename": "/data/help_templates/orig/pottery.tml", "start": 2387693, "end": 2388235}, {"filename": "/data/help_templates/orig/power.tml", "start": 2388235, "end": 2388969}, {"filename": "/data/help_templates/orig/powerline.tml", "start": 2388969, "end": 2389820}, {"filename": "/data/help_templates/orig/powerscoal.tml", "start": 2389820, "end": 2390740}, {"filename": "/data/help_templates/orig/powerssolar.tml", "start": 2390740, "end": 2391341}, {"filename": "/data/help_templates/orig/query.tml", "start": 2391341, "end": 2391832}, {"filename": "/data/help_templates/orig/rail.tml", "start": 2391832, "end": 2392431}, {"filename": "/data/help_templates/orig/recycle.tml", "start": 2392431, "end": 2393421}, {"filename": "/data/help_templates/orig/residential.tml", "start": 2393421, "end": 2395222}, {"filename": "/data/help_templates/orig/river.tml", "start": 2395222, "end": 2396202}, {"filename": "/data/help_templates/orig/road.tml", "start": 2396202, "end": 2396732}, {"filename": "/data/help_templates/orig/rocket.tml", "start": 2396732, "end": 2398294}, {"filename": "/data/help_templates/orig/school.tml", "start": 2398294, "end": 2399316}, {"filename": "/data/help_templates/orig/slow.tml", "start": 2399316, "end": 2399550}, {"filename": "/data/help_templates/orig/steel.tml", "start": 2399550, "end": 2400254}, {"filename": "/data/help_templates/orig/substation.tml", "start": 2400254, "end": 2400863}, {"filename": "/data/help_templates/orig/sustain.tml", "start": 2400863, "end": 2402252}, {"filename": "/data/help_templates/orig/tech-level.tml", "start": 2402252, "end": 2403363}, {"filename": "/data/help_templates/orig/tip.tml", "start": 2403363, "end": 2404401}, {"filename": "/data/help_templates/orig/track.tml", "start": 2404401, "end": 2404840}, {"filename": "/data/help_templates/orig/transport.tml", "start": 2404840, "end": 2406116}, {"filename": "/data/help_templates/orig/tutorial-advanced.tml", "start": 2406116, "end": 2407109}, {"filename": "/data/help_templates/orig/tutorial-aim.tml", "start": 2407109, "end": 2407795}, {"filename": "/data/help_templates/orig/tutorial-basics.tml", "start": 2407795, "end": 2411046}, {"filename": "/data/help_templates/orig/tutorial-overview.tml", "start": 2411046, "end": 2411759}, {"filename": "/data/help_templates/orig/tutorial-scenario.tml", "start": 2411759, "end": 2412336}, {"filename": "/data/help_templates/orig/tutorial.tml", "start": 2412336, "end": 2412444}, {"filename": "/data/help_templates/orig/university.tml", "start": 2412444, "end": 2413461}, {"filename": "/data/help_templates/orig/waste.tml", "start": 2413461, "end": 2413851}, {"filename": "/data/help_templates/orig/water.tml", "start": 2413851, "end": 2414268}, {"filename": "/data/help_templates/orig/waterwell.tml", "start": 2414268, "end": 2414743}, {"filename": "/data/help_templates/orig/windmill.tml", "start": 2414743, "end": 2415857}, {"filename": "/data/help_templates/ru/blacksmith.tml", "start": 2415857, "end": 2416778}, {"filename": "/data/help_templates/ru/bulldoze.tml", "start": 2416778, "end": 2418026}, {"filename": "/data/help_templates/ru/button-index.tml", "start": 2418026, "end": 2420208}, {"filename": "/data/help_templates/ru/coal.tml", "start": 2420208, "end": 2421414}, {"filename": "/data/help_templates/ru/coalmine.tml", "start": 2421414, "end": 2423053}, {"filename": "/data/help_templates/ru/commodities.tml", "start": 2423053, "end": 2424160}, {"filename": "/data/help_templates/ru/commune.tml", "start": 2424160, "end": 2425568}, {"filename": "/data/help_templates/ru/cricket.tml", "start": 2425568, "end": 2427318}, {"filename": "/data/help_templates/ru/dialogs.tml", "start": 2427318, "end": 2427844}, {"filename": "/data/help_templates/ru/economy.tml", "start": 2427844, "end": 2429292}, {"filename": "/data/help_templates/ru/evacuate.tml", "start": 2429292, "end": 2430292}, {"filename": "/data/help_templates/ru/export.tml", "start": 2430292, "end": 2431634}, {"filename": "/data/help_templates/ru/farm.tml", "start": 2431634, "end": 2432931}, {"filename": "/data/help_templates/ru/fast.tml", "start": 2432931, "end": 2433629}, {"filename": "/data/help_templates/ru/finance.tml", "start": 2433629, "end": 2434332}, {"filename": "/data/help_templates/ru/firestation.tml", "start": 2434332, "end": 2435990}, {"filename": "/data/help_templates/ru/food.tml", "start": 2435990, "end": 2436579}, {"filename": "/data/help_templates/ru/goods.tml", "start": 2436579, "end": 2437092}, {"filename": "/data/help_templates/ru/health.tml", "start": 2437092, "end": 2438563}, {"filename": "/data/help_templates/ru/help.tml", "start": 2438563, "end": 2439406}, {"filename": "/data/help_templates/ru/housing.tml", "start": 2439406, "end": 2440769}, {"filename": "/data/help_templates/ru/index.tml", "start": 2440769, "end": 2440801}, {"filename": "/data/help_templates/ru/industryh.tml", "start": 2440801, "end": 2442643}, {"filename": "/data/help_templates/ru/industryl.tml", "start": 2442643, "end": 2444611}, {"filename": "/data/help_templates/ru/keys.tml", "start": 2444611, "end": 2446437}, {"filename": "/data/help_templates/ru/labor.tml", "start": 2446437, "end": 2448169}, {"filename": "/data/help_templates/ru/market.tml", "start": 2448169, "end": 2450786}, {"filename": "/data/help_templates/ru/medium.tml", "start": 2450786, "end": 2451015}, {"filename": "/data/help_templates/ru/mill.tml", "start": 2451015, "end": 2452257}, {"filename": "/data/help_templates/ru/mini-screen.tml", "start": 2452257, "end": 2453060}, {"filename": "/data/help_templates/ru/monument.tml", "start": 2453060, "end": 2455046}, {"filename": "/data/help_templates/ru/msb-coal.tml", "start": 2455046, "end": 2455791}, {"filename": "/data/help_templates/ru/msb-cricket.tml", "start": 2455791, "end": 2456304}, {"filename": "/data/help_templates/ru/msb-fire.tml", "start": 2456304, "end": 2456814}, {"filename": "/data/help_templates/ru/msb-health.tml", "start": 2456814, "end": 2457305}, {"filename": "/data/help_templates/ru/msb-normal.tml", "start": 2457305, "end": 2457528}, {"filename": "/data/help_templates/ru/msb-pol.tml", "start": 2457528, "end": 2458380}, {"filename": "/data/help_templates/ru/msb-power.tml", "start": 2458380, "end": 2458893}, {"filename": "/data/help_templates/ru/msb-starve.tml", "start": 2458893, "end": 2459431}, {"filename": "/data/help_templates/ru/msb-transport.tml", "start": 2459431, "end": 2460207}, {"filename": "/data/help_templates/ru/msb-ub40.tml", "start": 2460207, "end": 2461047}, {"filename": "/data/help_templates/ru/ore.tml", "start": 2461047, "end": 2461458}, {"filename": "/data/help_templates/ru/oremine.tml", "start": 2461458, "end": 2462572}, {"filename": "/data/help_templates/ru/other-costs.tml", "start": 2462572, "end": 2463404}, {"filename": "/data/help_templates/ru/park.tml", "start": 2463404, "end": 2464692}, {"filename": "/data/help_templates/ru/pause.tml", "start": 2464692, "end": 2464874}, {"filename": "/data/help_templates/ru/pbar.tml", "start": 2464874, "end": 2465699}, {"filename": "/data/help_templates/ru/pollution.tml", "start": 2465699, "end": 2467026}, {"filename": "/data/help_templates/ru/port.tml", "start": 2467026, "end": 2468712}, {"filename": "/data/help_templates/ru/pottery.tml", "start": 2468712, "end": 2469370}, {"filename": "/data/help_templates/ru/power.tml", "start": 2469370, "end": 2470486}, {"filename": "/data/help_templates/ru/powerline.tml", "start": 2470486, "end": 2471816}, {"filename": "/data/help_templates/ru/powerscoal.tml", "start": 2471816, "end": 2473187}, {"filename": "/data/help_templates/ru/powerssolar.tml", "start": 2473187, "end": 2473846}, {"filename": "/data/help_templates/ru/query.tml", "start": 2473846, "end": 2474224}, {"filename": "/data/help_templates/ru/rail.tml", "start": 2474224, "end": 2474848}, {"filename": "/data/help_templates/ru/recycle.tml", "start": 2474848, "end": 2475761}, {"filename": "/data/help_templates/ru/residential.tml", "start": 2475761, "end": 2477417}, {"filename": "/data/help_templates/ru/river.tml", "start": 2477417, "end": 2479041}, {"filename": "/data/help_templates/ru/road.tml", "start": 2479041, "end": 2479598}, {"filename": "/data/help_templates/ru/rocket.tml", "start": 2479598, "end": 2482223}, {"filename": "/data/help_templates/ru/school.tml", "start": 2482223, "end": 2483386}, {"filename": "/data/help_templates/ru/slow.tml", "start": 2483386, "end": 2483677}, {"filename": "/data/help_templates/ru/steel.tml", "start": 2483677, "end": 2484872}, {"filename": "/data/help_templates/ru/substation.tml", "start": 2484872, "end": 2485392}, {"filename": "/data/help_templates/ru/sustain.tml", "start": 2485392, "end": 2487826}, {"filename": "/data/help_templates/ru/tech-level.tml", "start": 2487826, "end": 2489999}, {"filename": "/data/help_templates/ru/tip.tml", "start": 2489999, "end": 2490944}, {"filename": "/data/help_templates/ru/track.tml", "start": 2490944, "end": 2491361}, {"filename": "/data/help_templates/ru/transport.tml", "start": 2491361, "end": 2493529}, {"filename": "/data/help_templates/ru/tutorial-advanced.tml", "start": 2493529, "end": 2495326}, {"filename": "/data/help_templates/ru/tutorial-aim.tml", "start": 2495326, "end": 2496535}, {"filename": "/data/help_templates/ru/tutorial-basics.tml", "start": 2496535, "end": 2503179}, {"filename": "/data/help_templates/ru/tutorial-overview.tml", "start": 2503179, "end": 2504436}, {"filename": "/data/help_templates/ru/tutorial-scenario.tml", "start": 2504436, "end": 2505704}, {"filename": "/data/help_templates/ru/tutorial.tml", "start": 2505704, "end": 2505745}, {"filename": "/data/help_templates/ru/university.tml", "start": 2505745, "end": 2507174}, {"filename": "/data/help_templates/ru/waste.tml", "start": 2507174, "end": 2507851}, {"filename": "/data/help_templates/ru/water.tml", "start": 2507851, "end": 2508389}, {"filename": "/data/help_templates/ru/waterwell.tml", "start": 2508389, "end": 2509016}, {"filename": "/data/help_templates/ru/windmill.tml", "start": 2509016, "end": 2510296}, {"filename": "/data/images/gui/back.png", "start": 2510296, "end": 2510815}, {"filename": "/data/images/gui/buttonpanel/base/broom.png", "start": 2510815, "end": 2513188}, {"filename": "/data/images/gui/buttonpanel/base/broom.svg", "start": 2513188, "end": 2531239}, {"filename": "/data/images/gui/buttonpanel/base/bulldozer.png", "start": 2531239, "end": 2532945}, {"filename": "/data/images/gui/buttonpanel/base/bulldozer.svg", "start": 2532945, "end": 2554714}, {"filename": "/data/images/gui/buttonpanel/base/pointer.png", "start": 2554714, "end": 2556070}, {"filename": "/data/images/gui/buttonpanel/base/pointer.svg", "start": 2556070, "end": 2561585}, {"filename": "/data/images/gui/buttonpanel/industry/blacksmith.png", "start": 2561585, "end": 2563289}, {"filename": "/data/images/gui/buttonpanel/industry/blacksmith.svg", "start": 2563289, "end": 2583338}, {"filename": "/data/images/gui/buttonpanel/industry/heavyindustry2.png", "start": 2583338, "end": 2585241}, {"filename": "/data/images/gui/buttonpanel/industry/heavyindustry2.svg", "start": 2585241, "end": 2598764}, {"filename": "/data/images/gui/buttonpanel/industry/lightindustry.png", "start": 2598764, "end": 2600218}, {"filename": "/data/images/gui/buttonpanel/industry/lightindustry.svg", "start": 2600218, "end": 2618847}, {"filename": "/data/images/gui/buttonpanel/industry/market.png", "start": 2618847, "end": 2620359}, {"filename": "/data/images/gui/buttonpanel/industry/market.svg", "start": 2620359, "end": 2690181}, {"filename": "/data/images/gui/buttonpanel/industry/pottery.png", "start": 2690181, "end": 2691596}, {"filename": "/data/images/gui/buttonpanel/industry/pottery.svg", "start": 2691596, "end": 2700824}, {"filename": "/data/images/gui/buttonpanel/menu/game_menu.png", "start": 2700824, "end": 2702155}, {"filename": "/data/images/gui/buttonpanel/menu/game_menu.svg", "start": 2702155, "end": 2707557}, {"filename": "/data/images/gui/buttonpanel/mining/coalmine.png", "start": 2707557, "end": 2709556}, {"filename": "/data/images/gui/buttonpanel/mining/coalmine.svg", "start": 2709556, "end": 2755328}, {"filename": "/data/images/gui/buttonpanel/mining/commune.png", "start": 2755328, "end": 2756595}, {"filename": "/data/images/gui/buttonpanel/mining/commune.svg", "start": 2756595, "end": 2764422}, {"filename": "/data/images/gui/buttonpanel/mining/oremine.png", "start": 2764422, "end": 2766498}, {"filename": "/data/images/gui/buttonpanel/mining/oremine.svg", "start": 2766498, "end": 2811461}, {"filename": "/data/images/gui/buttonpanel/mining/recycling.png", "start": 2811461, "end": 2813488}, {"filename": "/data/images/gui/buttonpanel/mining/recycling.svg", "start": 2813488, "end": 2822456}, {"filename": "/data/images/gui/buttonpanel/mining/trash.png", "start": 2822456, "end": 2823968}, {"filename": "/data/images/gui/buttonpanel/mining/trash.svg", "start": 2823968, "end": 2863444}, {"filename": "/data/images/gui/buttonpanel/misc/book.png", "start": 2863444, "end": 2865074}, {"filename": "/data/images/gui/buttonpanel/misc/book.svg", "start": 2865074, "end": 2884958}, {"filename": "/data/images/gui/buttonpanel/misc/fire.png", "start": 2884958, "end": 2886238}, {"filename": "/data/images/gui/buttonpanel/misc/fire.svg", "start": 2886238, "end": 2903287}, {"filename": "/data/images/gui/buttonpanel/misc/health.png", "start": 2903287, "end": 2904119}, {"filename": "/data/images/gui/buttonpanel/misc/health.svg", "start": 2904119, "end": 2909851}, {"filename": "/data/images/gui/buttonpanel/misc/sports.png", "start": 2909851, "end": 2911740}, {"filename": "/data/images/gui/buttonpanel/misc/sports.svg", "start": 2911740, "end": 2922061}, {"filename": "/data/images/gui/buttonpanel/misc/university.png", "start": 2922061, "end": 2923095}, {"filename": "/data/images/gui/buttonpanel/misc/university.svg", "start": 2923095, "end": 2930607}, {"filename": "/data/images/gui/buttonpanel/parks/farm.png", "start": 2930607, "end": 2932763}, {"filename": "/data/images/gui/buttonpanel/parks/farm.svg", "start": 2932763, "end": 3000776}, {"filename": "/data/images/gui/buttonpanel/parks/mills.png", "start": 3000776, "end": 3003059}, {"filename": "/data/images/gui/buttonpanel/parks/mills.svg", "start": 3003059, "end": 3041162}, {"filename": "/data/images/gui/buttonpanel/parks/monument.png", "start": 3041162, "end": 3043164}, {"filename": "/data/images/gui/buttonpanel/parks/monument.svg", "start": 3043164, "end": 3058526}, {"filename": "/data/images/gui/buttonpanel/parks/tree.png", "start": 3058526, "end": 3059810}, {"filename": "/data/images/gui/buttonpanel/parks/tree.svg", "start": 3059810, "end": 3066973}, {"filename": "/data/images/gui/buttonpanel/parks/water.png", "start": 3066973, "end": 3068458}, {"filename": "/data/images/gui/buttonpanel/parks/water.svg", "start": 3068458, "end": 3075885}, {"filename": "/data/images/gui/buttonpanel/pottery.png", "start": 3075885, "end": 3077315}, {"filename": "/data/images/gui/buttonpanel/power/coalpower.png", "start": 3077315, "end": 3078913}, {"filename": "/data/images/gui/buttonpanel/power/coalpower.svg", "start": 3078913, "end": 3085513}, {"filename": "/data/images/gui/buttonpanel/power/powerlines.png", "start": 3085513, "end": 3087734}, {"filename": "/data/images/gui/buttonpanel/power/powerlines.svg", "start": 3087734, "end": 3117779}, {"filename": "/data/images/gui/buttonpanel/power/solarpower.png", "start": 3117779, "end": 3119800}, {"filename": "/data/images/gui/buttonpanel/power/solarpower.svg", "start": 3119800, "end": 3149898}, {"filename": "/data/images/gui/buttonpanel/power/substation.png", "start": 3149898, "end": 3151535}, {"filename": "/data/images/gui/buttonpanel/power/substation.svg", "start": 3151535, "end": 3169651}, {"filename": "/data/images/gui/buttonpanel/power/windmills.png", "start": 3169651, "end": 3171235}, {"filename": "/data/images/gui/buttonpanel/power/windmills.svg", "start": 3171235, "end": 3188847}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-high.png", "start": 3188847, "end": 3190843}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-high.svg", "start": 3190843, "end": 3232956}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-lo.png", "start": 3232956, "end": 3234618}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-lo.svg", "start": 3234618, "end": 3260616}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-med.png", "start": 3260616, "end": 3262773}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec-med.svg", "start": 3262773, "end": 3295365}, {"filename": "/data/images/gui/buttonpanel/residence/residence-hightec.svg", "start": 3295365, "end": 3362570}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-high.png", "start": 3362570, "end": 3364270}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-high.svg", "start": 3364270, "end": 3381634}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-lo.png", "start": 3381634, "end": 3382991}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-lo.svg", "start": 3382991, "end": 3397341}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-med.png", "start": 3397341, "end": 3398921}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec-med.svg", "start": 3398921, "end": 3412446}, {"filename": "/data/images/gui/buttonpanel/residence/residence-lotec.svg", "start": 3412446, "end": 3453210}, {"filename": "/data/images/gui/buttonpanel/residence/residence.png", "start": 3453210, "end": 3455482}, {"filename": "/data/images/gui/buttonpanel/residence/residence.svg", "start": 3455482, "end": 3487445}, {"filename": "/data/images/gui/buttonpanel/substation.png", "start": 3487445, "end": 3488252}, {"filename": "/data/images/gui/buttonpanel/transport/port.png", "start": 3488252, "end": 3490842}, {"filename": "/data/images/gui/buttonpanel/transport/port.svg", "start": 3490842, "end": 3523431}, {"filename": "/data/images/gui/buttonpanel/transport/rails2.png", "start": 3523431, "end": 3524671}, {"filename": "/data/images/gui/buttonpanel/transport/rails2.svg", "start": 3524671, "end": 3549962}, {"filename": "/data/images/gui/buttonpanel/transport/road.png", "start": 3549962, "end": 3550994}, {"filename": "/data/images/gui/buttonpanel/transport/road.svg", "start": 3550994, "end": 3557904}, {"filename": "/data/images/gui/buttonpanel/transport/rocket.png", "start": 3557904, "end": 3559347}, {"filename": "/data/images/gui/buttonpanel/transport/rocket.svg", "start": 3559347, "end": 3579821}, {"filename": "/data/images/gui/buttonpanel/transport/tracks.png", "start": 3579821, "end": 3580818}, {"filename": "/data/images/gui/buttonpanel/transport/tracks.svg", "start": 3580818, "end": 3584827}, {"filename": "/data/images/gui/buttonpanel/waterwell.png", "start": 3584827, "end": 3586517}, {"filename": "/data/images/gui/buttonpanel/waterwell.xcf", "start": 3586517, "end": 3619582}, {"filename": "/data/images/gui/buttons/button-border-1.png", "start": 3619582, "end": 3619883}, {"filename": "/data/images/gui/buttons/button-border-2.png", "start": 3619883, "end": 3620451}, {"filename": "/data/images/gui/buttons/button-border-3.png", "start": 3620451, "end": 3620933}, {"filename": "/data/images/gui/buttons/button-border-4.png", "start": 3620933, "end": 3621482}, {"filename": "/data/images/gui/buttons/button-border-5.png", "start": 3621482, "end": 3622141}, {"filename": "/data/images/gui/buttons/button-border-6.png", "start": 3622141, "end": 3622807}, {"filename": "/data/images/gui/buttons/button-checked.png", "start": 3622807, "end": 3623930}, {"filename": "/data/images/gui/buttons/button-clicked.png", "start": 3623930, "end": 3625112}, {"filename": "/data/images/gui/buttons/button-hover.png", "start": 3625112, "end": 3626462}, {"filename": "/data/images/gui/buttons/button.png", "start": 3626462, "end": 3627380}, {"filename": "/data/images/gui/buttons/buttons.svg", "start": 3627380, "end": 3638791}, {"filename": "/data/images/gui/buttons/menu-button-checked.png", "start": 3638791, "end": 3640134}, {"filename": "/data/images/gui/buttons/menu-button-clicked.png", "start": 3640134, "end": 3641525}, {"filename": "/data/images/gui/buttons/menu-button-hover.png", "start": 3641525, "end": 3643111}, {"filename": "/data/images/gui/buttons/menu-button.png", "start": 3643111, "end": 3644238}, {"filename": "/data/images/gui/buttons/randombutton-checked.png", "start": 3644238, "end": 3646111}, {"filename": "/data/images/gui/buttons/randombutton-clicked.png", "start": 3646111, "end": 3647981}, {"filename": "/data/images/gui/buttons/randombutton-hover.png", "start": 3647981, "end": 3649765}, {"filename": "/data/images/gui/buttons/randombutton.png", "start": 3649765, "end": 3651504}, {"filename": "/data/images/gui/buttons/round/button-round-20.png", "start": 3651504, "end": 3652290}, {"filename": "/data/images/gui/buttons/round/button-round-30.png", "start": 3652290, "end": 3653516}, {"filename": "/data/images/gui/buttons/round/button-round-40.png", "start": 3653516, "end": 3655243}, {"filename": "/data/images/gui/buttons/round/button-round-50.png", "start": 3655243, "end": 3657502}, {"filename": "/data/images/gui/buttons/round/button-round-checked-20.png", "start": 3657502, "end": 3658316}, {"filename": "/data/images/gui/buttons/round/button-round-checked-30.png", "start": 3658316, "end": 3659580}, {"filename": "/data/images/gui/buttons/round/button-round-checked-40.png", "start": 3659580, "end": 3661331}, {"filename": "/data/images/gui/buttons/round/button-round-checked-50.png", "start": 3661331, "end": 3663591}, {"filename": "/data/images/gui/buttons/round/button-round-clicked-20.png", "start": 3663591, "end": 3664403}, {"filename": "/data/images/gui/buttons/round/button-round-clicked-30.png", "start": 3664403, "end": 3665628}, {"filename": "/data/images/gui/buttons/round/button-round-clicked-40.png", "start": 3665628, "end": 3667317}, {"filename": "/data/images/gui/buttons/round/button-round-clicked-50.png", "start": 3667317, "end": 3669530}, {"filename": "/data/images/gui/buttons/round/button-round-hover-20.png", "start": 3669530, "end": 3670386}, {"filename": "/data/images/gui/buttons/round/button-round-hover-30.png", "start": 3670386, "end": 3671725}, {"filename": "/data/images/gui/buttons/round/button-round-hover-40.png", "start": 3671725, "end": 3673639}, {"filename": "/data/images/gui/buttons/round/button-round-hover-50.png", "start": 3673639, "end": 3676131}, {"filename": "/data/images/gui/buttons/round/button-round.svg", "start": 3676131, "end": 3698609}, {"filename": "/data/images/gui/buttons/savebutton-checked.png", "start": 3698609, "end": 3699728}, {"filename": "/data/images/gui/buttons/savebutton-clicked.png", "start": 3699728, "end": 3700896}, {"filename": "/data/images/gui/buttons/savebutton-hover.png", "start": 3700896, "end": 3701951}, {"filename": "/data/images/gui/buttons/savebutton.png", "start": 3701951, "end": 3703008}, {"filename": "/data/images/gui/buttons/savebutton.svg", "start": 3703008, "end": 3709513}, {"filename": "/data/images/gui/buttons/tabbed/tabbed-clicked.png", "start": 3709513, "end": 3710128}, {"filename": "/data/images/gui/buttons/tabbed/tabbed-hover.png", "start": 3710128, "end": 3710734}, {"filename": "/data/images/gui/buttons/tabbed/tabbed.png", "start": 3710734, "end": 3711309}, {"filename": "/data/images/gui/buttons/tabbed/tabbed.svg", "start": 3711309, "end": 3729768}, {"filename": "/data/images/gui/checkbox/checkbox.png", "start": 3729768, "end": 3730455}, {"filename": "/data/images/gui/checkbox/checkbox.svg", "start": 3730455, "end": 3751688}, {"filename": "/data/images/gui/checkbox/checkbox_checked.png", "start": 3751688, "end": 3753556}, {"filename": "/data/images/gui/checkbox/checkbox_red.png", "start": 3753556, "end": 3754384}, {"filename": "/data/images/gui/checkbox/checkbox_red_checked.png", "start": 3754384, "end": 3756271}, {"filename": "/data/images/gui/dialogs/buttons.svg", "start": 3756271, "end": 3813170}, {"filename": "/data/images/gui/dialogs/icons.svg", "start": 3813170, "end": 3820194}, {"filename": "/data/images/gui/dialogs/info.png", "start": 3820194, "end": 3823205}, {"filename": "/data/images/gui/dialogs/invention.png", "start": 3823205, "end": 3826476}, {"filename": "/data/images/gui/dialogs/invention.svg", "start": 3826476, "end": 3837261}, {"filename": "/data/images/gui/dialogs/nobutton-clicked.png", "start": 3837261, "end": 3838881}, {"filename": "/data/images/gui/dialogs/nobutton-hover.png", "start": 3838881, "end": 3840498}, {"filename": "/data/images/gui/dialogs/nobutton.png", "start": 3840498, "end": 3842210}, {"filename": "/data/images/gui/dialogs/okaybutton.png", "start": 3842210, "end": 3847241}, {"filename": "/data/images/gui/dialogs/question.png", "start": 3847241, "end": 3858951}, {"filename": "/data/images/gui/dialogs/warning.png", "start": 3858951, "end": 3861593}, {"filename": "/data/images/gui/dialogs/yesbutton-clicked.png", "start": 3861593, "end": 3863205}, {"filename": "/data/images/gui/dialogs/yesbutton-hover.png", "start": 3863205, "end": 3864840}, {"filename": "/data/images/gui/dialogs/yesbutton.png", "start": 3864840, "end": 3866554}, {"filename": "/data/images/gui/info/hidehigh.png", "start": 3866554, "end": 3867342}, {"filename": "/data/images/gui/info/info.png", "start": 3867342, "end": 3868128}, {"filename": "/data/images/gui/info/info.svg", "start": 3868128, "end": 3872771}, {"filename": "/data/images/gui/info/mapoverlay.png", "start": 3872771, "end": 3874203}, {"filename": "/data/images/gui/info/statistics.png", "start": 3874203, "end": 3875140}, {"filename": "/data/images/gui/info/statistics.svg", "start": 3875140, "end": 3879568}, {"filename": "/data/images/gui/info/terrainheight.png", "start": 3879568, "end": 3879955}, {"filename": "/data/images/gui/mapview/minimap_bg.png", "start": 3879955, "end": 3883908}, {"filename": "/data/images/gui/mapview/minimap_bg.svg", "start": 3883908, "end": 3888278}, {"filename": "/data/images/gui/mapview/roundbuttons/round_coal.png", "start": 3888278, "end": 3889110}, {"filename": "/data/images/gui/mapview/roundbuttons/round_electrics.png", "start": 3889110, "end": 3889718}, {"filename": "/data/images/gui/mapview/roundbuttons/round_electrics.svg", "start": 3889718, "end": 3895259}, {"filename": "/data/images/gui/mapview/roundbuttons/round_fire.png", "start": 3895259, "end": 3896004}, {"filename": "/data/images/gui/mapview/roundbuttons/round_food.png", "start": 3896004, "end": 3896798}, {"filename": "/data/images/gui/mapview/roundbuttons/round_health.png", "start": 3896798, "end": 3897336}, {"filename": "/data/images/gui/mapview/roundbuttons/round_health.svg", "start": 3897336, "end": 3903072}, {"filename": "/data/images/gui/mapview/roundbuttons/round_pollution.png", "start": 3903072, "end": 3903933}, {"filename": "/data/images/gui/mapview/roundbuttons/round_pollution.svg", "start": 3903933, "end": 3910126}, {"filename": "/data/images/gui/mapview/roundbuttons/round_resident.png", "start": 3910126, "end": 3911286}, {"filename": "/data/images/gui/mapview/roundbuttons/round_road.png", "start": 3911286, "end": 3912092}, {"filename": "/data/images/gui/mapview/roundbuttons/round_sport.png", "start": 3912092, "end": 3912830}, {"filename": "/data/images/gui/mapview/roundbuttons/round_sport.svg", "start": 3912830, "end": 3922565}, {"filename": "/data/images/gui/mapview/roundbuttons/round_ub40.png", "start": 3922565, "end": 3923544}, {"filename": "/data/images/gui/mapview/roundbuttons/round_ub40.svg", "start": 3923544, "end": 3935128}, {"filename": "/data/images/gui/panel.png", "start": 3935128, "end": 3994993}, {"filename": "/data/images/gui/panel.svg", "start": 3994993, "end": 4166267}, {"filename": "/data/images/gui/pbar_bg.png", "start": 4166267, "end": 4190500}, {"filename": "/data/images/gui/scrollbar/arrow_down.png", "start": 4190500, "end": 4191036}, {"filename": "/data/images/gui/scrollbar/arrow_up.png", "start": 4191036, "end": 4191562}, {"filename": "/data/images/gui/scrollbar/scrollbar.svg", "start": 4191562, "end": 4215564}, {"filename": "/data/images/gui/speed/fast.png", "start": 4215564, "end": 4217346}, {"filename": "/data/images/gui/speed/faster.png", "start": 4217346, "end": 4219080}, {"filename": "/data/images/gui/speed/normal.png", "start": 4219080, "end": 4220493}, {"filename": "/data/images/gui/speed/pause.png", "start": 4220493, "end": 4221765}, {"filename": "/data/images/gui/speed/speed.svg", "start": 4221765, "end": 4246344}, {"filename": "/data/images/gui/speedpanel.png", "start": 4246344, "end": 4250007}, {"filename": "/data/images/gui/window/titlebar.svg", "start": 4250007, "end": 4298994}, {"filename": "/data/images/gui/window/window_close.png", "start": 4298994, "end": 4299996}, {"filename": "/data/images/gui/window/window_close_clicked.png", "start": 4299996, "end": 4301074}, {"filename": "/data/images/gui/window/window_close_hover.png", "start": 4301074, "end": 4302116}, {"filename": "/data/images/gui/zoom/zoom.svg", "start": 4302116, "end": 4316008}, {"filename": "/data/images/gui/zoom/zoomin.png", "start": 4316008, "end": 4318045}, {"filename": "/data/images/gui/zoom/zoomout.png", "start": 4318045, "end": 4320071}, {"filename": "/data/images/mainmenu/background.png", "start": 4320071, "end": 4735807}, {"filename": "/data/images/mainmenu/background.svg", "start": 4735807, "end": 4738299}, {"filename": "/data/images/mainmenu/buttons/back-clicked.png", "start": 4738299, "end": 4743752}, {"filename": "/data/images/mainmenu/buttons/back-hover.png", "start": 4743752, "end": 4749342}, {"filename": "/data/images/mainmenu/buttons/back.png", "start": 4749342, "end": 4754707}, {"filename": "/data/images/mainmenu/buttons/buttons.svg", "start": 4754707, "end": 4829648}, {"filename": "/data/images/mainmenu/buttons/buttons2.svg", "start": 4829648, "end": 4876142}, {"filename": "/data/images/mainmenu/buttons/continue-clicked.png", "start": 4876142, "end": 4883018}, {"filename": "/data/images/mainmenu/buttons/continue-hover.png", "start": 4883018, "end": 4889989}, {"filename": "/data/images/mainmenu/buttons/continue.png", "start": 4889989, "end": 4896912}, {"filename": "/data/images/mainmenu/buttons/credits-clicked.png", "start": 4896912, "end": 4904224}, {"filename": "/data/images/mainmenu/buttons/credits-hover.png", "start": 4904224, "end": 4911576}, {"filename": "/data/images/mainmenu/buttons/credits.png", "start": 4911576, "end": 4918977}, {"filename": "/data/images/mainmenu/buttons/load-clicked.png", "start": 4918977, "end": 4926219}, {"filename": "/data/images/mainmenu/buttons/load-hover.png", "start": 4926219, "end": 4933552}, {"filename": "/data/images/mainmenu/buttons/load.png", "start": 4933552, "end": 4940899}, {"filename": "/data/images/mainmenu/buttons/new-clicked.png", "start": 4940899, "end": 4946439}, {"filename": "/data/images/mainmenu/buttons/new-hover.png", "start": 4946439, "end": 4952032}, {"filename": "/data/images/mainmenu/buttons/new.png", "start": 4952032, "end": 4957668}, {"filename": "/data/images/mainmenu/buttons/options-clicked.png", "start": 4957668, "end": 4965529}, {"filename": "/data/images/mainmenu/buttons/options-hover.png", "start": 4965529, "end": 4973563}, {"filename": "/data/images/mainmenu/buttons/options.png", "start": 4973563, "end": 4981559}, {"filename": "/data/images/mainmenu/buttons/quit-clicked.png", "start": 4981559, "end": 4988197}, {"filename": "/data/images/mainmenu/buttons/quit-hover.png", "start": 4988197, "end": 4994919}, {"filename": "/data/images/mainmenu/buttons/quit.png", "start": 4994919, "end": 5001638}, {"filename": "/data/images/mainmenu/buttons/save-clicked.png", "start": 5001638, "end": 5008513}, {"filename": "/data/images/mainmenu/buttons/save-hover.png", "start": 5008513, "end": 5015489}, {"filename": "/data/images/mainmenu/buttons/save.png", "start": 5015489, "end": 5022486}, {"filename": "/data/images/mainmenu/buttons/start-clicked.png", "start": 5022486, "end": 5028067}, {"filename": "/data/images/mainmenu/buttons/start-hover.png", "start": 5028067, "end": 5033753}, {"filename": "/data/images/mainmenu/buttons/start.png", "start": 5033753, "end": 5039138}, {"filename": "/data/images/mainmenu/credits_back.png", "start": 5039138, "end": 5205307}, {"filename": "/data/images/mainmenu/credits_back.svg", "start": 5205307, "end": 5302984}, {"filename": "/data/images/mainmenu/loadsave_back.png", "start": 5302984, "end": 5408692}, {"filename": "/data/images/mainmenu/loadsave_back.svg", "start": 5408692, "end": 5534576}, {"filename": "/data/images/mainmenu/logo.png", "start": 5534576, "end": 5551598}, {"filename": "/data/images/mainmenu/logo.svg", "start": 5551598, "end": 5573151}, {"filename": "/data/images/mainmenu/menu_back.png", "start": 5573151, "end": 5824983}, {"filename": "/data/images/mainmenu/menu_back.svg", "start": 5824983, "end": 6005029}, {"filename": "/data/images/mainmenu/newgame_back.png", "start": 6005029, "end": 6071796}, {"filename": "/data/images/mainmenu/newgame_back.svg", "start": 6071796, "end": 6181685}, {"filename": "/data/images/mainmenu/settings/fullscreen.png", "start": 6181685, "end": 6183477}, {"filename": "/data/images/mainmenu/settings/fullscreen.svg", "start": 6183477, "end": 6197641}, {"filename": "/data/images/mainmenu/settings/music-off.png", "start": 6197641, "end": 6200839}, {"filename": "/data/images/mainmenu/settings/music-on.png", "start": 6200839, "end": 6203119}, {"filename": "/data/images/mainmenu/settings/music.svg", "start": 6203119, "end": 6212830}, {"filename": "/data/images/mainmenu/settings/sound-off.png", "start": 6212830, "end": 6216474}, {"filename": "/data/images/mainmenu/settings/sound-on.png", "start": 6216474, "end": 6219645}, {"filename": "/data/images/mainmenu/settings/sound.svg", "start": 6219645, "end": 6228917}, {"filename": "/data/images/mainmenu/settings/windowed.png", "start": 6228917, "end": 6231625}, {"filename": "/data/images/mainmenu/settings_back.png", "start": 6231625, "end": 6313669}, {"filename": "/data/images/mainmenu/settings_back.svg", "start": 6313669, "end": 6416940}, {"filename": "/data/images/tiles/README.txt", "start": 6416940, "end": 6423883}, {"filename": "/data/images/tiles/blacksmith0.png", "start": 6423883, "end": 6479128}, {"filename": "/data/images/tiles/blacksmith1.png", "start": 6479128, "end": 6540872}, {"filename": "/data/images/tiles/blacksmith2.png", "start": 6540872, "end": 6603459}, {"filename": "/data/images/tiles/blacksmith3.png", "start": 6603459, "end": 6664562}, {"filename": "/data/images/tiles/blacksmith4.png", "start": 6664562, "end": 6725392}, {"filename": "/data/images/tiles/blacksmith5.png", "start": 6725392, "end": 6787521}, {"filename": "/data/images/tiles/blacksmith6.png", "start": 6787521, "end": 6849243}, {"filename": "/data/images/tiles/blank.png", "start": 6849243, "end": 6854076}, {"filename": "/data/images/tiles/bridge_rail_0.png", "start": 6854076, "end": 6914096}, {"filename": "/data/images/tiles/bridge_rail_90.png", "start": 6914096, "end": 6976477}, {"filename": "/data/images/tiles/bridge_rail_slope1_0.png", "start": 6976477, "end": 7023553}, {"filename": "/data/images/tiles/bridge_rail_slope1_180.png", "start": 7023553, "end": 7063017}, {"filename": "/data/images/tiles/bridge_rail_slope1_270.png", "start": 7063017, "end": 7110035}, {"filename": "/data/images/tiles/bridge_rail_slope1_90.png", "start": 7110035, "end": 7149175}, {"filename": "/data/images/tiles/bridge_rail_slope2_0.png", "start": 7149175, "end": 7205967}, {"filename": "/data/images/tiles/bridge_rail_slope2_180.png", "start": 7205967, "end": 7255316}, {"filename": "/data/images/tiles/bridge_rail_slope2_270.png", "start": 7255316, "end": 7313301}, {"filename": "/data/images/tiles/bridge_rail_slope2_90.png", "start": 7313301, "end": 7364656}, {"filename": "/data/images/tiles/bridge_road_0.png", "start": 7364656, "end": 7423687}, {"filename": "/data/images/tiles/bridge_road_90.png", "start": 7423687, "end": 7483613}, {"filename": "/data/images/tiles/bridge_road_slope1_0.png", "start": 7483613, "end": 7533827}, {"filename": "/data/images/tiles/bridge_road_slope1_180.png", "start": 7533827, "end": 7566361}, {"filename": "/data/images/tiles/bridge_road_slope1_270.png", "start": 7566361, "end": 7616948}, {"filename": "/data/images/tiles/bridge_road_slope1_90.png", "start": 7616948, "end": 7653678}, {"filename": "/data/images/tiles/bridge_road_slope2_0.png", "start": 7653678, "end": 7711074}, {"filename": "/data/images/tiles/bridge_road_slope2_180.png", "start": 7711074, "end": 7755835}, {"filename": "/data/images/tiles/bridge_road_slope2_270.png", "start": 7755835, "end": 7816331}, {"filename": "/data/images/tiles/bridge_road_slope2_90.png", "start": 7816331, "end": 7864627}, {"filename": "/data/images/tiles/bridge_track_0.png", "start": 7864627, "end": 7914336}, {"filename": "/data/images/tiles/bridge_track_90.png", "start": 7914336, "end": 7965695}, {"filename": "/data/images/tiles/bridge_track_slope1_0.png", "start": 7965695, "end": 8014871}, {"filename": "/data/images/tiles/bridge_track_slope1_180.png", "start": 8014871, "end": 8054213}, {"filename": "/data/images/tiles/bridge_track_slope1_270.png", "start": 8054213, "end": 8104086}, {"filename": "/data/images/tiles/bridge_track_slope1_90.png", "start": 8104086, "end": 8143405}, {"filename": "/data/images/tiles/burnt_land.png", "start": 8143405, "end": 8148471}, {"filename": "/data/images/tiles/car01-0000.png", "start": 8148471, "end": 8155762}, {"filename": "/data/images/tiles/car01-0001.png", "start": 8155762, "end": 8161228}, {"filename": "/data/images/tiles/car01-0002.png", "start": 8161228, "end": 8168335}, {"filename": "/data/images/tiles/car01-0003.png", "start": 8168335, "end": 8175316}, {"filename": "/data/images/tiles/car01-0004.png", "start": 8175316, "end": 8182602}, {"filename": "/data/images/tiles/car01-0005.png", "start": 8182602, "end": 8187907}, {"filename": "/data/images/tiles/car01-0006.png", "start": 8187907, "end": 8194975}, {"filename": "/data/images/tiles/car01-0007.png", "start": 8194975, "end": 8201965}, {"filename": "/data/images/tiles/car01-down0013.png", "start": 8201965, "end": 8209913}, {"filename": "/data/images/tiles/car01-down0014.png", "start": 8209913, "end": 8217912}, {"filename": "/data/images/tiles/car01-down0015.png", "start": 8217912, "end": 8224252}, {"filename": "/data/images/tiles/car01-down0016.png", "start": 8224252, "end": 8230276}, {"filename": "/data/images/tiles/car01-up0009.png", "start": 8230276, "end": 8236727}, {"filename": "/data/images/tiles/car01-up0010.png", "start": 8236727, "end": 8242956}, {"filename": "/data/images/tiles/car01-up0011.png", "start": 8242956, "end": 8250958}, {"filename": "/data/images/tiles/car01-up0012.png", "start": 8250958, "end": 8258976}, {"filename": "/data/images/tiles/car02-0000.png", "start": 8258976, "end": 8265898}, {"filename": "/data/images/tiles/car02-0001.png", "start": 8265898, "end": 8271070}, {"filename": "/data/images/tiles/car02-0002.png", "start": 8271070, "end": 8277849}, {"filename": "/data/images/tiles/car02-0003.png", "start": 8277849, "end": 8284450}, {"filename": "/data/images/tiles/car02-0004.png", "start": 8284450, "end": 8291350}, {"filename": "/data/images/tiles/car02-0005.png", "start": 8291350, "end": 8296343}, {"filename": "/data/images/tiles/car02-0006.png", "start": 8296343, "end": 8303031}, {"filename": "/data/images/tiles/car02-0007.png", "start": 8303031, "end": 8309611}, {"filename": "/data/images/tiles/car02-down0013.png", "start": 8309611, "end": 8317079}, {"filename": "/data/images/tiles/car02-down0014.png", "start": 8317079, "end": 8324616}, {"filename": "/data/images/tiles/car02-down0015.png", "start": 8324616, "end": 8330845}, {"filename": "/data/images/tiles/car02-down0016.png", "start": 8330845, "end": 8336683}, {"filename": "/data/images/tiles/car02-up0009.png", "start": 8336683, "end": 8342978}, {"filename": "/data/images/tiles/car02-up0010.png", "start": 8342978, "end": 8348979}, {"filename": "/data/images/tiles/car02-up0011.png", "start": 8348979, "end": 8356450}, {"filename": "/data/images/tiles/car02-up0012.png", "start": 8356450, "end": 8364061}, {"filename": "/data/images/tiles/car03-0000.png", "start": 8364061, "end": 8371136}, {"filename": "/data/images/tiles/car03-0001.png", "start": 8371136, "end": 8376606}, {"filename": "/data/images/tiles/car03-0002.png", "start": 8376606, "end": 8383676}, {"filename": "/data/images/tiles/car03-0003.png", "start": 8383676, "end": 8390506}, {"filename": "/data/images/tiles/car03-0004.png", "start": 8390506, "end": 8397500}, {"filename": "/data/images/tiles/car03-0005.png", "start": 8397500, "end": 8402625}, {"filename": "/data/images/tiles/car03-0006.png", "start": 8402625, "end": 8409499}, {"filename": "/data/images/tiles/car03-0007.png", "start": 8409499, "end": 8416319}, {"filename": "/data/images/tiles/car03-down0013.png", "start": 8416319, "end": 8424021}, {"filename": "/data/images/tiles/car03-down0014.png", "start": 8424021, "end": 8431750}, {"filename": "/data/images/tiles/car03-down0015.png", "start": 8431750, "end": 8437912}, {"filename": "/data/images/tiles/car03-down0016.png", "start": 8437912, "end": 8443849}, {"filename": "/data/images/tiles/car03-up0009.png", "start": 8443849, "end": 8450261}, {"filename": "/data/images/tiles/car03-up0010.png", "start": 8450261, "end": 8456452}, {"filename": "/data/images/tiles/car03-up0011.png", "start": 8456452, "end": 8464208}, {"filename": "/data/images/tiles/car03-up0012.png", "start": 8464208, "end": 8472038}, {"filename": "/data/images/tiles/car04-0000.png", "start": 8472038, "end": 8479134}, {"filename": "/data/images/tiles/car04-0001.png", "start": 8479134, "end": 8484578}, {"filename": "/data/images/tiles/car04-0002.png", "start": 8484578, "end": 8491626}, {"filename": "/data/images/tiles/car04-0003.png", "start": 8491626, "end": 8498454}, {"filename": "/data/images/tiles/car04-0004.png", "start": 8498454, "end": 8505433}, {"filename": "/data/images/tiles/car04-0005.png", "start": 8505433, "end": 8510550}, {"filename": "/data/images/tiles/car04-0006.png", "start": 8510550, "end": 8517405}, {"filename": "/data/images/tiles/car04-0007.png", "start": 8517405, "end": 8524244}, {"filename": "/data/images/tiles/car04-down0013.png", "start": 8524244, "end": 8531949}, {"filename": "/data/images/tiles/car04-down0014.png", "start": 8531949, "end": 8539648}, {"filename": "/data/images/tiles/car04-down0015.png", "start": 8539648, "end": 8545808}, {"filename": "/data/images/tiles/car04-down0016.png", "start": 8545808, "end": 8551719}, {"filename": "/data/images/tiles/car04-up0009.png", "start": 8551719, "end": 8558116}, {"filename": "/data/images/tiles/car04-up0010.png", "start": 8558116, "end": 8564311}, {"filename": "/data/images/tiles/car04-up0011.png", "start": 8564311, "end": 8572125}, {"filename": "/data/images/tiles/car04-up0012.png", "start": 8572125, "end": 8579934}, {"filename": "/data/images/tiles/car05-0000.png", "start": 8579934, "end": 8587095}, {"filename": "/data/images/tiles/car05-0001.png", "start": 8587095, "end": 8592474}, {"filename": "/data/images/tiles/car05-0002.png", "start": 8592474, "end": 8599491}, {"filename": "/data/images/tiles/car05-0003.png", "start": 8599491, "end": 8606216}, {"filename": "/data/images/tiles/car05-0004.png", "start": 8606216, "end": 8613292}, {"filename": "/data/images/tiles/car05-0005.png", "start": 8613292, "end": 8618567}, {"filename": "/data/images/tiles/car05-0006.png", "start": 8618567, "end": 8625475}, {"filename": "/data/images/tiles/car05-0007.png", "start": 8625475, "end": 8632153}, {"filename": "/data/images/tiles/car05-down0013.png", "start": 8632153, "end": 8640074}, {"filename": "/data/images/tiles/car05-down0014.png", "start": 8640074, "end": 8648003}, {"filename": "/data/images/tiles/car05-down0015.png", "start": 8648003, "end": 8654118}, {"filename": "/data/images/tiles/car05-down0016.png", "start": 8654118, "end": 8660005}, {"filename": "/data/images/tiles/car05-up0009.png", "start": 8660005, "end": 8666178}, {"filename": "/data/images/tiles/car05-up0010.png", "start": 8666178, "end": 8672164}, {"filename": "/data/images/tiles/car05-up0011.png", "start": 8672164, "end": 8680055}, {"filename": "/data/images/tiles/car05-up0012.png", "start": 8680055, "end": 8687913}, {"filename": "/data/images/tiles/coalmine-empty.png", "start": 8687913, "end": 8799660}, {"filename": "/data/images/tiles/coalmine-full.png", "start": 8799660, "end": 8917471}, {"filename": "/data/images/tiles/coalmine-low.png", "start": 8917471, "end": 9028894}, {"filename": "/data/images/tiles/coalmine-med.png", "start": 9028894, "end": 9141718}, {"filename": "/data/images/tiles/commune1.png", "start": 9141718, "end": 9679517}, {"filename": "/data/images/tiles/commune10.png", "start": 9679517, "end": 9892304}, {"filename": "/data/images/tiles/commune11.png", "start": 9892304, "end": 10104949}, {"filename": "/data/images/tiles/commune2.png", "start": 10104949, "end": 10317652}, {"filename": "/data/images/tiles/commune3.png", "start": 10317652, "end": 10530332}, {"filename": "/data/images/tiles/commune4.png", "start": 10530332, "end": 10742977}, {"filename": "/data/images/tiles/commune5.png", "start": 10742977, "end": 10955673}, {"filename": "/data/images/tiles/commune6.png", "start": 10955673, "end": 11168282}, {"filename": "/data/images/tiles/commune7.png", "start": 11168282, "end": 11380852}, {"filename": "/data/images/tiles/commune8.png", "start": 11380852, "end": 11593161}, {"filename": "/data/images/tiles/commune9.png", "start": 11593161, "end": 11805637}, {"filename": "/data/images/tiles/cricket1.png", "start": 11805637, "end": 11864213}, {"filename": "/data/images/tiles/cricket2.png", "start": 11864213, "end": 11922862}, {"filename": "/data/images/tiles/cricket3.png", "start": 11922862, "end": 11981490}, {"filename": "/data/images/tiles/cricket4.png", "start": 11981490, "end": 12040622}, {"filename": "/data/images/tiles/cricket5.png", "start": 12040622, "end": 12098585}, {"filename": "/data/images/tiles/cricket6.png", "start": 12098585, "end": 12157964}, {"filename": "/data/images/tiles/cricket7.png", "start": 12157964, "end": 12216211}, {"filename": "/data/images/tiles/crossing_rail_road0.png", "start": 12216211, "end": 12248046}, {"filename": "/data/images/tiles/crossing_rail_road90.png", "start": 12248046, "end": 12281718}, {"filename": "/data/images/tiles/crossing_rail_track0.png", "start": 12281718, "end": 12314158}, {"filename": "/data/images/tiles/crossing_rail_track90.png", "start": 12314158, "end": 12348171}, {"filename": "/data/images/tiles/desert.png", "start": 12348171, "end": 12354542}, {"filename": "/data/images/tiles/desert_0.png", "start": 12354542, "end": 12366349}, {"filename": "/data/images/tiles/desert_1d.png", "start": 12366349, "end": 12377830}, {"filename": "/data/images/tiles/desert_1l.png", "start": 12377830, "end": 12389143}, {"filename": "/data/images/tiles/desert_1r.png", "start": 12389143, "end": 12400660}, {"filename": "/data/images/tiles/desert_1u.png", "start": 12400660, "end": 12412103}, {"filename": "/data/images/tiles/desert_2ld.png", "start": 12412103, "end": 12422542}, {"filename": "/data/images/tiles/desert_2lr.png", "start": 12422542, "end": 12432795}, {"filename": "/data/images/tiles/desert_2lu.png", "start": 12432795, "end": 12442889}, {"filename": "/data/images/tiles/desert_2rd.png", "start": 12442889, "end": 12453410}, {"filename": "/data/images/tiles/desert_2ru.png", "start": 12453410, "end": 12463837}, {"filename": "/data/images/tiles/desert_2ud.png", "start": 12463837, "end": 12474215}, {"filename": "/data/images/tiles/desert_3lrd.png", "start": 12474215, "end": 12483317}, {"filename": "/data/images/tiles/desert_3lru.png", "start": 12483317, "end": 12491761}, {"filename": "/data/images/tiles/desert_3lud.png", "start": 12491761, "end": 12500348}, {"filename": "/data/images/tiles/desert_3rud.png", "start": 12500348, "end": 12509508}, {"filename": "/data/images/tiles/ex_port.png", "start": 12509508, "end": 12700982}, {"filename": "/data/images/tiles/extend.sh", "start": 12700982, "end": 12701824}, {"filename": "/data/images/tiles/farm0.png", "start": 12701824, "end": 12870599}, {"filename": "/data/images/tiles/farm11.png", "start": 12870599, "end": 13058042}, {"filename": "/data/images/tiles/farm15.png", "start": 13058042, "end": 13248587}, {"filename": "/data/images/tiles/farm3.png", "start": 13248587, "end": 13443835}, {"filename": "/data/images/tiles/farm7.png", "start": 13443835, "end": 13625982}, {"filename": "/data/images/tiles/fire1.png", "start": 13625982, "end": 13654015}, {"filename": "/data/images/tiles/fire2.png", "start": 13654015, "end": 13681362}, {"filename": "/data/images/tiles/fire3.png", "start": 13681362, "end": 13709069}, {"filename": "/data/images/tiles/fire4.png", "start": 13709069, "end": 13736487}, {"filename": "/data/images/tiles/fire5.png", "start": 13736487, "end": 13764211}, {"filename": "/data/images/tiles/firedone1.png", "start": 13764211, "end": 13787700}, {"filename": "/data/images/tiles/firedone2.png", "start": 13787700, "end": 13796098}, {"filename": "/data/images/tiles/firedone3.png", "start": 13796098, "end": 13804871}, {"filename": "/data/images/tiles/firedone4.png", "start": 13804871, "end": 13814260}, {"filename": "/data/images/tiles/firestation1.png", "start": 13814260, "end": 13865611}, {"filename": "/data/images/tiles/firestation10.png", "start": 13865611, "end": 13916932}, {"filename": "/data/images/tiles/firestation2.png", "start": 13916932, "end": 13967694}, {"filename": "/data/images/tiles/firestation3.png", "start": 13967694, "end": 14020511}, {"filename": "/data/images/tiles/firestation4.png", "start": 14020511, "end": 14075693}, {"filename": "/data/images/tiles/firestation5.png", "start": 14075693, "end": 14130875}, {"filename": "/data/images/tiles/firestation6.png", "start": 14130875, "end": 14183986}, {"filename": "/data/images/tiles/firestation7.png", "start": 14183986, "end": 14233670}, {"filename": "/data/images/tiles/firestation8.png", "start": 14233670, "end": 14286370}, {"filename": "/data/images/tiles/firestation9.png", "start": 14286370, "end": 14339173}, {"filename": "/data/images/tiles/green.png", "start": 14339173, "end": 14353327}, {"filename": "/data/images/tiles/health.png", "start": 14353327, "end": 14455297}, {"filename": "/data/images/tiles/images.xml", "start": 14455297, "end": 14481119}, {"filename": "/data/images/tiles/industryhc.png", "start": 14481119, "end": 14703555}, {"filename": "/data/images/tiles/industryhh1.png", "start": 14703555, "end": 14936027}, {"filename": "/data/images/tiles/industryhh2.png", "start": 14936027, "end": 15169532}, {"filename": "/data/images/tiles/industryhh3.png", "start": 15169532, "end": 15403334}, {"filename": "/data/images/tiles/industryhh4.png", "start": 15403334, "end": 15636533}, {"filename": "/data/images/tiles/industryhh5.png", "start": 15636533, "end": 15869681}, {"filename": "/data/images/tiles/industryhh6.png", "start": 15869681, "end": 16102929}, {"filename": "/data/images/tiles/industryhh7.png", "start": 16102929, "end": 16336415}, {"filename": "/data/images/tiles/industryhh8.png", "start": 16336415, "end": 16569205}, {"filename": "/data/images/tiles/industryhl1.png", "start": 16569205, "end": 16798952}, {"filename": "/data/images/tiles/industryhl2.png", "start": 16798952, "end": 17028795}, {"filename": "/data/images/tiles/industryhl3.png", "start": 17028795, "end": 17258746}, {"filename": "/data/images/tiles/industryhl4.png", "start": 17258746, "end": 17488472}, {"filename": "/data/images/tiles/industryhl5.png", "start": 17488472, "end": 17718323}, {"filename": "/data/images/tiles/industryhl6.png", "start": 17718323, "end": 17948243}, {"filename": "/data/images/tiles/industryhl7.png", "start": 17948243, "end": 18178233}, {"filename": "/data/images/tiles/industryhl8.png", "start": 18178233, "end": 18408268}, {"filename": "/data/images/tiles/industryhm1.png", "start": 18408268, "end": 18639923}, {"filename": "/data/images/tiles/industryhm2.png", "start": 18639923, "end": 18871606}, {"filename": "/data/images/tiles/industryhm3.png", "start": 18871606, "end": 19103013}, {"filename": "/data/images/tiles/industryhm4.png", "start": 19103013, "end": 19333827}, {"filename": "/data/images/tiles/industryhm5.png", "start": 19333827, "end": 19564604}, {"filename": "/data/images/tiles/industryhm6.png", "start": 19564604, "end": 19795450}, {"filename": "/data/images/tiles/industryhm7.png", "start": 19795450, "end": 20026867}, {"filename": "/data/images/tiles/industryhm8.png", "start": 20026867, "end": 20258446}, {"filename": "/data/images/tiles/industryl-empty.png", "start": 20258446, "end": 20600829}, {"filename": "/data/images/tiles/industryl-full.png", "start": 20600829, "end": 20949794}, {"filename": "/data/images/tiles/industryl-low.png", "start": 20949794, "end": 21294276}, {"filename": "/data/images/tiles/industryl-med.png", "start": 21294276, "end": 21640466}, {"filename": "/data/images/tiles/industryl-smoke0080.png", "start": 21640466, "end": 21703051}, {"filename": "/data/images/tiles/industryl-smoke0082.png", "start": 21703051, "end": 21764911}, {"filename": "/data/images/tiles/industryl-smoke0084.png", "start": 21764911, "end": 21825758}, {"filename": "/data/images/tiles/industryl-smoke0086.png", "start": 21825758, "end": 21886682}, {"filename": "/data/images/tiles/industryl-smoke0088.png", "start": 21886682, "end": 21946950}, {"filename": "/data/images/tiles/industryl-smoke0090.png", "start": 21946950, "end": 22007646}, {"filename": "/data/images/tiles/industryl-smoke0092.png", "start": 22007646, "end": 22069070}, {"filename": "/data/images/tiles/industryl-smoke0094.png", "start": 22069070, "end": 22133564}, {"filename": "/data/images/tiles/industryl-smoke0096.png", "start": 22133564, "end": 22199134}, {"filename": "/data/images/tiles/industryl-smoke0098.png", "start": 22199134, "end": 22263648}, {"filename": "/data/images/tiles/list", "start": 22263648, "end": 22263889}, {"filename": "/data/images/tiles/market-empty.png", "start": 22263889, "end": 22330557}, {"filename": "/data/images/tiles/market-full.png", "start": 22330557, "end": 22404928}, {"filename": "/data/images/tiles/market-low.png", "start": 22404928, "end": 22473374}, {"filename": "/data/images/tiles/market-med.png", "start": 22473374, "end": 22544372}, {"filename": "/data/images/tiles/mill0.png", "start": 22544372, "end": 22613593}, {"filename": "/data/images/tiles/mill1.png", "start": 22613593, "end": 22690388}, {"filename": "/data/images/tiles/mill2.png", "start": 22690388, "end": 22766692}, {"filename": "/data/images/tiles/mill3.png", "start": 22766692, "end": 22842214}, {"filename": "/data/images/tiles/mill4.png", "start": 22842214, "end": 22917387}, {"filename": "/data/images/tiles/mill5.png", "start": 22917387, "end": 22992773}, {"filename": "/data/images/tiles/mill6.png", "start": 22992773, "end": 23068311}, {"filename": "/data/images/tiles/monument0.png", "start": 23068311, "end": 23107956}, {"filename": "/data/images/tiles/monument1.png", "start": 23107956, "end": 23149494}, {"filename": "/data/images/tiles/monument2.png", "start": 23149494, "end": 23189643}, {"filename": "/data/images/tiles/monument3.png", "start": 23189643, "end": 23235105}, {"filename": "/data/images/tiles/monument4.png", "start": 23235105, "end": 23284101}, {"filename": "/data/images/tiles/monument5.png", "start": 23284101, "end": 23336376}, {"filename": "/data/images/tiles/oremine1.png", "start": 23336376, "end": 23485568}, {"filename": "/data/images/tiles/oremine2.png", "start": 23485568, "end": 23637342}, {"filename": "/data/images/tiles/oremine3.png", "start": 23637342, "end": 23789773}, {"filename": "/data/images/tiles/oremine4.png", "start": 23789773, "end": 23926854}, {"filename": "/data/images/tiles/oremine5.png", "start": 23926854, "end": 24069845}, {"filename": "/data/images/tiles/oremine6.png", "start": 24069845, "end": 24203736}, {"filename": "/data/images/tiles/oremine7.png", "start": 24203736, "end": 24357225}, {"filename": "/data/images/tiles/oremine8.png", "start": 24357225, "end": 24512321}, {"filename": "/data/images/tiles/parkland-lake.png", "start": 24512321, "end": 24529587}, {"filename": "/data/images/tiles/parkland-plane.png", "start": 24529587, "end": 24548875}, {"filename": "/data/images/tiles/pottery0.png", "start": 24548875, "end": 24608330}, {"filename": "/data/images/tiles/pottery1.png", "start": 24608330, "end": 24667785}, {"filename": "/data/images/tiles/pottery10.png", "start": 24667785, "end": 24725592}, {"filename": "/data/images/tiles/pottery2.png", "start": 24725592, "end": 24788528}, {"filename": "/data/images/tiles/pottery3.png", "start": 24788528, "end": 24853735}, {"filename": "/data/images/tiles/pottery4.png", "start": 24853735, "end": 24919062}, {"filename": "/data/images/tiles/pottery5.png", "start": 24919062, "end": 24982833}, {"filename": "/data/images/tiles/pottery6.png", "start": 24982833, "end": 25040640}, {"filename": "/data/images/tiles/pottery7.png", "start": 25040640, "end": 25099492}, {"filename": "/data/images/tiles/pottery8.png", "start": 25099492, "end": 25157993}, {"filename": "/data/images/tiles/pottery9.png", "start": 25157993, "end": 25216845}, {"filename": "/data/images/tiles/powerl-suspended0.png", "start": 25216845, "end": 25219442}, {"filename": "/data/images/tiles/powerl-suspended90.png", "start": 25219442, "end": 25220358}, {"filename": "/data/images/tiles/powerlhd.png", "start": 25220358, "end": 25224755}, {"filename": "/data/images/tiles/powerlhl.png", "start": 25224755, "end": 25232997}, {"filename": "/data/images/tiles/powerlldd.png", "start": 25232997, "end": 25237610}, {"filename": "/data/images/tiles/powerlldl.png", "start": 25237610, "end": 25247294}, {"filename": "/data/images/tiles/powerlldrd.png", "start": 25247294, "end": 25257904}, {"filename": "/data/images/tiles/powerlldrl.png", "start": 25257904, "end": 25284136}, {"filename": "/data/images/tiles/powerlldud.png", "start": 25284136, "end": 25294630}, {"filename": "/data/images/tiles/powerlldul.png", "start": 25294630, "end": 25320229}, {"filename": "/data/images/tiles/powerllud.png", "start": 25320229, "end": 25324308}, {"filename": "/data/images/tiles/powerlludrd.png", "start": 25324308, "end": 25336013}, {"filename": "/data/images/tiles/powerlludrl.png", "start": 25336013, "end": 25362284}, {"filename": "/data/images/tiles/powerllul.png", "start": 25362284, "end": 25370167}, {"filename": "/data/images/tiles/powerllurd.png", "start": 25370167, "end": 25380783}, {"filename": "/data/images/tiles/powerllurl.png", "start": 25380783, "end": 25406453}, {"filename": "/data/images/tiles/powerlrdd.png", "start": 25406453, "end": 25410888}, {"filename": "/data/images/tiles/powerlrdl.png", "start": 25410888, "end": 25419086}, {"filename": "/data/images/tiles/powerlrud.png", "start": 25419086, "end": 25423715}, {"filename": "/data/images/tiles/powerlrul.png", "start": 25423715, "end": 25433375}, {"filename": "/data/images/tiles/powerludrd.png", "start": 25433375, "end": 25444171}, {"filename": "/data/images/tiles/powerludrl.png", "start": 25444171, "end": 25470341}, {"filename": "/data/images/tiles/powerlvd.png", "start": 25470341, "end": 25475124}, {"filename": "/data/images/tiles/powerlvl.png", "start": 25475124, "end": 25483684}, {"filename": "/data/images/tiles/powerscoal-empty.png", "start": 25483684, "end": 26203289}, {"filename": "/data/images/tiles/powerscoal-full.png", "start": 26203289, "end": 26922903}, {"filename": "/data/images/tiles/powerscoal-low.png", "start": 26922903, "end": 27639593}, {"filename": "/data/images/tiles/powerscoal-med.png", "start": 27639593, "end": 28357647}, {"filename": "/data/images/tiles/powerscoal-smoke0080.png", "start": 28357647, "end": 28418545}, {"filename": "/data/images/tiles/powerscoal-smoke0082.png", "start": 28418545, "end": 28478314}, {"filename": "/data/images/tiles/powerscoal-smoke0084.png", "start": 28478314, "end": 28537699}, {"filename": "/data/images/tiles/powerscoal-smoke0086.png", "start": 28537699, "end": 28596755}, {"filename": "/data/images/tiles/powerscoal-smoke0088.png", "start": 28596755, "end": 28655281}, {"filename": "/data/images/tiles/powerscoal-smoke0090.png", "start": 28655281, "end": 28714094}, {"filename": "/data/images/tiles/powerscoal-smoke0092.png", "start": 28714094, "end": 28773763}, {"filename": "/data/images/tiles/powerscoal-smoke0094.png", "start": 28773763, "end": 28836456}, {"filename": "/data/images/tiles/powerscoal-smoke0096.png", "start": 28836456, "end": 28899955}, {"filename": "/data/images/tiles/powerscoal-smoke0098.png", "start": 28899955, "end": 28962397}, {"filename": "/data/images/tiles/powerscoal-smoke0100.png", "start": 28962397, "end": 29023958}, {"filename": "/data/images/tiles/powerssolar.png", "start": 29023958, "end": 29261894}, {"filename": "/data/images/tiles/raildr.png", "start": 29261894, "end": 29276076}, {"filename": "/data/images/tiles/railld.png", "start": 29276076, "end": 29290658}, {"filename": "/data/images/tiles/railldr.png", "start": 29290658, "end": 29305399}, {"filename": "/data/images/tiles/raillr.png", "start": 29305399, "end": 29320283}, {"filename": "/data/images/tiles/raillu.png", "start": 29320283, "end": 29334704}, {"filename": "/data/images/tiles/raillud.png", "start": 29334704, "end": 29349232}, {"filename": "/data/images/tiles/railludr.png", "start": 29349232, "end": 29364276}, {"filename": "/data/images/tiles/raillur.png", "start": 29364276, "end": 29378914}, {"filename": "/data/images/tiles/railud.png", "start": 29378914, "end": 29393801}, {"filename": "/data/images/tiles/railudr.png", "start": 29393801, "end": 29408712}, {"filename": "/data/images/tiles/railur.png", "start": 29408712, "end": 29423458}, {"filename": "/data/images/tiles/recycle-centre.png", "start": 29423458, "end": 29444890}, {"filename": "/data/images/tiles/reshihi.png", "start": 29444890, "end": 29640160}, {"filename": "/data/images/tiles/reshilow.png", "start": 29640160, "end": 29822332}, {"filename": "/data/images/tiles/reslowhi.png", "start": 29822332, "end": 29913193}, {"filename": "/data/images/tiles/reslowlow.png", "start": 29913193, "end": 29956395}, {"filename": "/data/images/tiles/resmedhi.png", "start": 29956395, "end": 30079288}, {"filename": "/data/images/tiles/resmedlow.png", "start": 30079288, "end": 30204446}, {"filename": "/data/images/tiles/roaddr.png", "start": 30204446, "end": 30232270}, {"filename": "/data/images/tiles/roadld.png", "start": 30232270, "end": 30260199}, {"filename": "/data/images/tiles/roadldr.png", "start": 30260199, "end": 30288232}, {"filename": "/data/images/tiles/roadlr.png", "start": 30288232, "end": 30315842}, {"filename": "/data/images/tiles/roadlu.png", "start": 30315842, "end": 30342997}, {"filename": "/data/images/tiles/roadlud.png", "start": 30342997, "end": 30370863}, {"filename": "/data/images/tiles/roadludr.png", "start": 30370863, "end": 30398834}, {"filename": "/data/images/tiles/roadlur.png", "start": 30398834, "end": 30426629}, {"filename": "/data/images/tiles/roadud.png", "start": 30426629, "end": 30454327}, {"filename": "/data/images/tiles/roadudr.png", "start": 30454327, "end": 30482350}, {"filename": "/data/images/tiles/roadur.png", "start": 30482350, "end": 30510348}, {"filename": "/data/images/tiles/rocket1.png", "start": 30510348, "end": 30532118}, {"filename": "/data/images/tiles/rocket2.png", "start": 30532118, "end": 30565713}, {"filename": "/data/images/tiles/rocket3.png", "start": 30565713, "end": 30603110}, {"filename": "/data/images/tiles/rocket4.png", "start": 30603110, "end": 30639576}, {"filename": "/data/images/tiles/rocket5.png", "start": 30639576, "end": 30707665}, {"filename": "/data/images/tiles/rocket6.png", "start": 30707665, "end": 30774890}, {"filename": "/data/images/tiles/rocket7.png", "start": 30774890, "end": 30844918}, {"filename": "/data/images/tiles/rocketflown.png", "start": 30844918, "end": 30872796}, {"filename": "/data/images/tiles/school-animation.png", "start": 30872796, "end": 31039447}, {"filename": "/data/images/tiles/school-static.png", "start": 31039447, "end": 31206186}, {"filename": "/data/images/tiles/school-swing0001.png", "start": 31206186, "end": 31209334}, {"filename": "/data/images/tiles/school-swing0002.png", "start": 31209334, "end": 31212556}, {"filename": "/data/images/tiles/school-swing0003.png", "start": 31212556, "end": 31215792}, {"filename": "/data/images/tiles/school-swing0004.png", "start": 31215792, "end": 31219102}, {"filename": "/data/images/tiles/school-swing0005.png", "start": 31219102, "end": 31222354}, {"filename": "/data/images/tiles/school-swing0006.png", "start": 31222354, "end": 31225503}, {"filename": "/data/images/tiles/school-swing0007.png", "start": 31225503, "end": 31228651}, {"filename": "/data/images/tiles/school-swing0008.png", "start": 31228651, "end": 31231623}, {"filename": "/data/images/tiles/school-swing0009.png", "start": 31231623, "end": 31234503}, {"filename": "/data/images/tiles/school-swing0010.png", "start": 31234503, "end": 31237675}, {"filename": "/data/images/tiles/school-swing0011.png", "start": 31237675, "end": 31240824}, {"filename": "/data/images/tiles/school0.png", "start": 31240824, "end": 31407512}, {"filename": "/data/images/tiles/shanty.png", "start": 31407512, "end": 31423580}, {"filename": "/data/images/tiles/substation-G.png", "start": 31423580, "end": 31475111}, {"filename": "/data/images/tiles/substation-R.png", "start": 31475111, "end": 31526684}, {"filename": "/data/images/tiles/substation-RG.png", "start": 31526684, "end": 31578426}, {"filename": "/data/images/tiles/tip0.png", "start": 31578426, "end": 31662816}, {"filename": "/data/images/tiles/tip1.png", "start": 31662816, "end": 31756650}, {"filename": "/data/images/tiles/tip2.png", "start": 31756650, "end": 31859763}, {"filename": "/data/images/tiles/tip3.png", "start": 31859763, "end": 31976779}, {"filename": "/data/images/tiles/tip4.png", "start": 31976779, "end": 32111562}, {"filename": "/data/images/tiles/tip5.png", "start": 32111562, "end": 32272204}, {"filename": "/data/images/tiles/tip6.png", "start": 32272204, "end": 32441273}, {"filename": "/data/images/tiles/tip7.png", "start": 32441273, "end": 32625178}, {"filename": "/data/images/tiles/tip8.png", "start": 32625178, "end": 32825466}, {"filename": "/data/images/tiles/trackdr.png", "start": 32825466, "end": 32834894}, {"filename": "/data/images/tiles/trackld.png", "start": 32834894, "end": 32844456}, {"filename": "/data/images/tiles/trackldr.png", "start": 32844456, "end": 32852996}, {"filename": "/data/images/tiles/tracklr.png", "start": 32852996, "end": 32861629}, {"filename": "/data/images/tiles/tracklu.png", "start": 32861629, "end": 32870371}, {"filename": "/data/images/tiles/tracklud.png", "start": 32870371, "end": 32878821}, {"filename": "/data/images/tiles/trackludr.png", "start": 32878821, "end": 32887389}, {"filename": "/data/images/tiles/tracklur.png", "start": 32887389, "end": 32895743}, {"filename": "/data/images/tiles/trackud.png", "start": 32895743, "end": 32904319}, {"filename": "/data/images/tiles/trackudr.png", "start": 32904319, "end": 32912873}, {"filename": "/data/images/tiles/trackur.png", "start": 32912873, "end": 32922231}, {"filename": "/data/images/tiles/tree.png", "start": 32922231, "end": 32945456}, {"filename": "/data/images/tiles/tree2.png", "start": 32945456, "end": 32973315}, {"filename": "/data/images/tiles/tree3.png", "start": 32973315, "end": 33003825}, {"filename": "/data/images/tiles/truck01-0000.png", "start": 33003825, "end": 33014050}, {"filename": "/data/images/tiles/truck01-0001.png", "start": 33014050, "end": 33021049}, {"filename": "/data/images/tiles/truck01-0002.png", "start": 33021049, "end": 33030976}, {"filename": "/data/images/tiles/truck01-0003.png", "start": 33030976, "end": 33040646}, {"filename": "/data/images/tiles/truck01-0004.png", "start": 33040646, "end": 33050687}, {"filename": "/data/images/tiles/truck01-0005.png", "start": 33050687, "end": 33057602}, {"filename": "/data/images/tiles/truck01-0006.png", "start": 33057602, "end": 33067393}, {"filename": "/data/images/tiles/truck01-0007.png", "start": 33067393, "end": 33076904}, {"filename": "/data/images/tiles/truck01-down0013.png", "start": 33076904, "end": 33088249}, {"filename": "/data/images/tiles/truck01-down0014.png", "start": 33088249, "end": 33099464}, {"filename": "/data/images/tiles/truck01-down0015.png", "start": 33099464, "end": 33108261}, {"filename": "/data/images/tiles/truck01-down0016.png", "start": 33108261, "end": 33116963}, {"filename": "/data/images/tiles/truck01-up0009.png", "start": 33116963, "end": 33125842}, {"filename": "/data/images/tiles/truck01-up0010.png", "start": 33125842, "end": 33134382}, {"filename": "/data/images/tiles/truck01-up0011.png", "start": 33134382, "end": 33145472}, {"filename": "/data/images/tiles/truck01-up0012.png", "start": 33145472, "end": 33156211}, {"filename": "/data/images/tiles/truck02-0000.png", "start": 33156211, "end": 33168503}, {"filename": "/data/images/tiles/truck02-0001.png", "start": 33168503, "end": 33176663}, {"filename": "/data/images/tiles/truck02-0002.png", "start": 33176663, "end": 33188131}, {"filename": "/data/images/tiles/truck02-0003.png", "start": 33188131, "end": 33198073}, {"filename": "/data/images/tiles/truck02-0004.png", "start": 33198073, "end": 33208453}, {"filename": "/data/images/tiles/truck02-0005.png", "start": 33208453, "end": 33214769}, {"filename": "/data/images/tiles/truck02-0006.png", "start": 33214769, "end": 33225344}, {"filename": "/data/images/tiles/truck02-0007.png", "start": 33225344, "end": 33235250}, {"filename": "/data/images/tiles/truck02-down0013.png", "start": 33235250, "end": 33248318}, {"filename": "/data/images/tiles/truck02-down0014.png", "start": 33248318, "end": 33260568}, {"filename": "/data/images/tiles/truck02-down0015.png", "start": 33260568, "end": 33269979}, {"filename": "/data/images/tiles/truck02-down0016.png", "start": 33269979, "end": 33279615}, {"filename": "/data/images/tiles/truck02-up0009.png", "start": 33279615, "end": 33290793}, {"filename": "/data/images/tiles/truck02-up0010.png", "start": 33290793, "end": 33301256}, {"filename": "/data/images/tiles/truck02-up0011.png", "start": 33301256, "end": 33313097}, {"filename": "/data/images/tiles/truck02-up0012.png", "start": 33313097, "end": 33324536}, {"filename": "/data/images/tiles/truck03-0000.png", "start": 33324536, "end": 33333808}, {"filename": "/data/images/tiles/truck03-0001.png", "start": 33333808, "end": 33339806}, {"filename": "/data/images/tiles/truck03-0002.png", "start": 33339806, "end": 33349151}, {"filename": "/data/images/tiles/truck03-0003.png", "start": 33349151, "end": 33358144}, {"filename": "/data/images/tiles/truck03-0004.png", "start": 33358144, "end": 33367833}, {"filename": "/data/images/tiles/truck03-0005.png", "start": 33367833, "end": 33374499}, {"filename": "/data/images/tiles/truck03-0006.png", "start": 33374499, "end": 33383914}, {"filename": "/data/images/tiles/truck03-0007.png", "start": 33383914, "end": 33392674}, {"filename": "/data/images/tiles/truck03-down0013.png", "start": 33392674, "end": 33402871}, {"filename": "/data/images/tiles/truck03-down0014.png", "start": 33402871, "end": 33413158}, {"filename": "/data/images/tiles/truck03-down0015.png", "start": 33413158, "end": 33421683}, {"filename": "/data/images/tiles/truck03-down0016.png", "start": 33421683, "end": 33430080}, {"filename": "/data/images/tiles/truck03-up0009.png", "start": 33430080, "end": 33438268}, {"filename": "/data/images/tiles/truck03-up0010.png", "start": 33438268, "end": 33446192}, {"filename": "/data/images/tiles/truck03-up0011.png", "start": 33446192, "end": 33456698}, {"filename": "/data/images/tiles/truck03-up0012.png", "start": 33456698, "end": 33467185}, {"filename": "/data/images/tiles/truck04-0000.png", "start": 33467185, "end": 33480139}, {"filename": "/data/images/tiles/truck04-0001.png", "start": 33480139, "end": 33489008}, {"filename": "/data/images/tiles/truck04-0002.png", "start": 33489008, "end": 33501367}, {"filename": "/data/images/tiles/truck04-0003.png", "start": 33501367, "end": 33512263}, {"filename": "/data/images/tiles/truck04-0004.png", "start": 33512263, "end": 33523984}, {"filename": "/data/images/tiles/truck04-0005.png", "start": 33523984, "end": 33531140}, {"filename": "/data/images/tiles/truck04-0006.png", "start": 33531140, "end": 33542408}, {"filename": "/data/images/tiles/truck04-0007.png", "start": 33542408, "end": 33553350}, {"filename": "/data/images/tiles/truck04-down0013.png", "start": 33553350, "end": 33567253}, {"filename": "/data/images/tiles/truck04-down0014.png", "start": 33567253, "end": 33580756}, {"filename": "/data/images/tiles/truck04-down0015.png", "start": 33580756, "end": 33591403}, {"filename": "/data/images/tiles/truck04-down0016.png", "start": 33591403, "end": 33601673}, {"filename": "/data/images/tiles/truck04-up0009.png", "start": 33601673, "end": 33613261}, {"filename": "/data/images/tiles/truck04-up0010.png", "start": 33613261, "end": 33624273}, {"filename": "/data/images/tiles/truck04-up0011.png", "start": 33624273, "end": 33637016}, {"filename": "/data/images/tiles/truck04-up0012.png", "start": 33637016, "end": 33649224}, {"filename": "/data/images/tiles/truck05-0000.png", "start": 33649224, "end": 33660576}, {"filename": "/data/images/tiles/truck05-0001.png", "start": 33660576, "end": 33668440}, {"filename": "/data/images/tiles/truck05-0002.png", "start": 33668440, "end": 33679404}, {"filename": "/data/images/tiles/truck05-0003.png", "start": 33679404, "end": 33689865}, {"filename": "/data/images/tiles/truck05-0004.png", "start": 33689865, "end": 33701145}, {"filename": "/data/images/tiles/truck05-0005.png", "start": 33701145, "end": 33708848}, {"filename": "/data/images/tiles/truck05-0006.png", "start": 33708848, "end": 33719762}, {"filename": "/data/images/tiles/truck05-0007.png", "start": 33719762, "end": 33729991}, {"filename": "/data/images/tiles/truck05-down0013.png", "start": 33729991, "end": 33742665}, {"filename": "/data/images/tiles/truck05-down0014.png", "start": 33742665, "end": 33754832}, {"filename": "/data/images/tiles/truck05-down0015.png", "start": 33754832, "end": 33764487}, {"filename": "/data/images/tiles/truck05-down0016.png", "start": 33764487, "end": 33773962}, {"filename": "/data/images/tiles/truck05-up0009.png", "start": 33773962, "end": 33783631}, {"filename": "/data/images/tiles/truck05-up0010.png", "start": 33783631, "end": 33792915}, {"filename": "/data/images/tiles/truck05-up0011.png", "start": 33792915, "end": 33805303}, {"filename": "/data/images/tiles/truck05-up0012.png", "start": 33805303, "end": 33817455}, {"filename": "/data/images/tiles/university.png", "start": 33817455, "end": 33865132}, {"filename": "/data/images/tiles/water.png", "start": 33865132, "end": 33879032}, {"filename": "/data/images/tiles/waterd.png", "start": 33879032, "end": 33892256}, {"filename": "/data/images/tiles/waterl.png", "start": 33892256, "end": 33905520}, {"filename": "/data/images/tiles/waterld.png", "start": 33905520, "end": 33917373}, {"filename": "/data/images/tiles/waterlr.png", "start": 33917373, "end": 33929213}, {"filename": "/data/images/tiles/waterlrd.png", "start": 33929213, "end": 33939117}, {"filename": "/data/images/tiles/waterlu.png", "start": 33939117, "end": 33950821}, {"filename": "/data/images/tiles/waterlud.png", "start": 33950821, "end": 33960497}, {"filename": "/data/images/tiles/waterlur.png", "start": 33960497, "end": 33970168}, {"filename": "/data/images/tiles/waterlurd.png", "start": 33970168, "end": 33977381}, {"filename": "/data/images/tiles/waterr.png", "start": 33977381, "end": 33990597}, {"filename": "/data/images/tiles/waterrd.png", "start": 33990597, "end": 34002733}, {"filename": "/data/images/tiles/wateru.png", "start": 34002733, "end": 34015760}, {"filename": "/data/images/tiles/waterud.png", "start": 34015760, "end": 34027413}, {"filename": "/data/images/tiles/waterur.png", "start": 34027413, "end": 34039307}, {"filename": "/data/images/tiles/waterurd.png", "start": 34039307, "end": 34048999}, {"filename": "/data/images/tiles/waterwell.png", "start": 34048999, "end": 34110682}, {"filename": "/data/images/tiles/windmill1g.png", "start": 34110682, "end": 34178903}, {"filename": "/data/images/tiles/windmill1r.png", "start": 34178903, "end": 34247125}, {"filename": "/data/images/tiles/windmill1rg.png", "start": 34247125, "end": 34315341}, {"filename": "/data/images/tiles/windmill1w.png", "start": 34315341, "end": 34381785}, {"filename": "/data/images/tiles/windmill2g.png", "start": 34381785, "end": 34452064}, {"filename": "/data/images/tiles/windmill2r.png", "start": 34452064, "end": 34522347}, {"filename": "/data/images/tiles/windmill2rg.png", "start": 34522347, "end": 34592624}, {"filename": "/data/images/tiles/windmill2w.png", "start": 34592624, "end": 34660504}, {"filename": "/data/images/tiles/windmill3g.png", "start": 34660504, "end": 34729595}, {"filename": "/data/images/tiles/windmill3r.png", "start": 34729595, "end": 34798680}, {"filename": "/data/images/tiles/windmill3rg.png", "start": 34798680, "end": 34867758}, {"filename": "/data/images/tiles/windmill3w.png", "start": 34867758, "end": 34932829}, {"filename": "/data/locale/ca.po", "start": 34932829, "end": 34968834}, {"filename": "/data/locale/cs.po", "start": 34968834, "end": 35004932}, {"filename": "/data/locale/da.po", "start": 35004932, "end": 35041125}, {"filename": "/data/locale/de.po", "start": 35041125, "end": 35080226}, {"filename": "/data/locale/el.po", "start": 35080226, "end": 35125597}, {"filename": "/data/locale/es.po", "start": 35125597, "end": 35162052}, {"filename": "/data/locale/fr.po", "start": 35162052, "end": 35201477}, {"filename": "/data/locale/gd.po", "start": 35201477, "end": 35221368}, {"filename": "/data/locale/gl.po", "start": 35221368, "end": 35258526}, {"filename": "/data/locale/gui/ca.po", "start": 35258526, "end": 35284209}, {"filename": "/data/locale/gui/cs.po", "start": 35284209, "end": 35305865}, {"filename": "/data/locale/gui/de.po", "start": 35305865, "end": 35333540}, {"filename": "/data/locale/gui/el.po", "start": 35333540, "end": 35368244}, {"filename": "/data/locale/gui/es.po", "start": 35368244, "end": 35394998}, {"filename": "/data/locale/gui/fr.po", "start": 35394998, "end": 35422169}, {"filename": "/data/locale/gui/gd.po", "start": 35422169, "end": 35450457}, {"filename": "/data/locale/gui/gl.po", "start": 35450457, "end": 35477348}, {"filename": "/data/locale/gui/ja.po", "start": 35477348, "end": 35505190}, {"filename": "/data/locale/gui/nl.po", "start": 35505190, "end": 35531665}, {"filename": "/data/locale/gui/pl.po", "start": 35531665, "end": 35557968}, {"filename": "/data/locale/gui/pt_BR.po", "start": 35557968, "end": 35584780}, {"filename": "/data/locale/gui/ru.po", "start": 35584780, "end": 35615748}, {"filename": "/data/locale/gui/sv.po", "start": 35615748, "end": 35641294}, {"filename": "/data/locale/gui/tr.po", "start": 35641294, "end": 35668776}, {"filename": "/data/locale/gui/zh_CN.po", "start": 35668776, "end": 35692816}, {"filename": "/data/locale/ja.po", "start": 35692816, "end": 35729844}, {"filename": "/data/locale/nl.po", "start": 35729844, "end": 35766826}, {"filename": "/data/locale/pl.po", "start": 35766826, "end": 35801451}, {"filename": "/data/locale/pt_BR.po", "start": 35801451, "end": 35843924}, {"filename": "/data/locale/ru.po", "start": 35843924, "end": 35880067}, {"filename": "/data/locale/sv.po", "start": 35880067, "end": 35921088}, {"filename": "/data/locale/tr.po", "start": 35921088, "end": 35953670}, {"filename": "/data/locale/zh_CN.po", "start": 35953670, "end": 35989312}, {"filename": "/data/messages/blacksmithup.mes", "start": 35989312, "end": 35989490}, {"filename": "/data/messages/coalmineup.mes", "start": 35989490, "end": 35989652}, {"filename": "/data/messages/coalpowerup.mes", "start": 35989652, "end": 35989810}, {"filename": "/data/messages/cricketup.mes", "start": 35989810, "end": 35990041}, {"filename": "/data/messages/fire.mes", "start": 35990041, "end": 35990092}, {"filename": "/data/messages/firestationup.mes", "start": 35990092, "end": 35990404}, {"filename": "/data/messages/healthup.mes", "start": 35990404, "end": 35990639}, {"filename": "/data/messages/hvindustryup.mes", "start": 35990639, "end": 35990821}, {"filename": "/data/messages/import-exportup.mes", "start": 35990821, "end": 35990946}, {"filename": "/data/messages/launch-evac.mes", "start": 35990946, "end": 35991090}, {"filename": "/data/messages/launch-fail.mes", "start": 35991090, "end": 35991272}, {"filename": "/data/messages/launch-gone.mes", "start": 35991272, "end": 35991348}, {"filename": "/data/messages/launch-good.mes", "start": 35991348, "end": 35991381}, {"filename": "/data/messages/ltindustryup.mes", "start": 35991381, "end": 35991549}, {"filename": "/data/messages/millup.mes", "start": 35991549, "end": 35991748}, {"filename": "/data/messages/mod_wind_up.mes", "start": 35991748, "end": 35991905}, {"filename": "/data/messages/no-credit-parkland.mes", "start": 35991905, "end": 35992022}, {"filename": "/data/messages/no-credit-recycle.mes", "start": 35992022, "end": 35992151}, {"filename": "/data/messages/no-credit-rocket.mes", "start": 35992151, "end": 35992281}, {"filename": "/data/messages/no-credit-solar-power.mes", "start": 35992281, "end": 35992413}, {"filename": "/data/messages/no-credit-university.mes", "start": 35992413, "end": 35992537}, {"filename": "/data/messages/nobull-tip.mes", "start": 35992537, "end": 35992582}, {"filename": "/data/messages/oremineup.mes", "start": 35992582, "end": 35992714}, {"filename": "/data/messages/parkup.mes", "start": 35992714, "end": 35992869}, {"filename": "/data/messages/potteryup.mes", "start": 35992869, "end": 35993074}, {"filename": "/data/messages/railwayup.mes", "start": 35993074, "end": 35993198}, {"filename": "/data/messages/recycleup.mes", "start": 35993198, "end": 35993387}, {"filename": "/data/messages/riverup.mes", "start": 35993387, "end": 35993552}, {"filename": "/data/messages/roadup.mes", "start": 35993552, "end": 35993670}, {"filename": "/data/messages/rocketup.mes", "start": 35993670, "end": 35993929}, {"filename": "/data/messages/schoolup.mes", "start": 35993929, "end": 35994104}, {"filename": "/data/messages/solarpowerup.mes", "start": 35994104, "end": 35994252}, {"filename": "/data/messages/sustain.mes", "start": 35994252, "end": 35994450}, {"filename": "/data/messages/too-old.mes", "start": 35994450, "end": 35994519}, {"filename": "/data/messages/universityup.mes", "start": 35994519, "end": 35994710}, {"filename": "/data/messages/warning.mes", "start": 35994710, "end": 35994721}, {"filename": "/data/messages/windmillup.mes", "start": 35994721, "end": 35994816}, {"filename": "/data/music/default/01 - pronobozo - lincity.ogg", "start": 35994816, "end": 39759443, "audio": 1}, {"filename": "/data/music/default/02 - Robert van Herk - City Blues.ogg", "start": 39759443, "end": 42662314, "audio": 1}, {"filename": "/data/music/default/03 - Robert van Herk - Architectural Contemplations.ogg", "start": 42662314, "end": 44740124, "audio": 1}, {"filename": "/data/music/default/default.xml", "start": 44740124, "end": 44740746}, {"filename": "/data/opening/8x8thin", "start": 44740746, "end": 44742794}, {"filename": "/data/opening/Beach.scn", "start": 44742794, "end": 44814125}, {"filename": "/data/opening/Rocket_98.scn", "start": 44814125, "end": 44946582}, {"filename": "/data/opening/alt-8x8", "start": 44946582, "end": 44948630}, {"filename": "/data/opening/bad_times.scn", "start": 44948630, "end": 45026194}, {"filename": "/data/opening/do_image", "start": 45026194, "end": 45026320}, {"filename": "/data/opening/extreme_arid.scn", "start": 45026320, "end": 45089590}, {"filename": "/data/opening/extreme_wetland.scn", "start": 45089590, "end": 45154101}, {"filename": "/data/opening/good_times.scn", "start": 45154101, "end": 45233842}, {"filename": "/data/opening/iso8859-1-8x8.fnt", "start": 45233842, "end": 45237588}, {"filename": "/data/opening/iso8859-1-8x8.raw", "start": 45237588, "end": 45239636}, {"filename": "/data/opening/iso8859-2-8x8.fnt", "start": 45239636, "end": 45243382}, {"filename": "/data/opening/iso8859-2-8x8.raw", "start": 45243382, "end": 45245430}, {"filename": "/data/opening/open.pov", "start": 45245430, "end": 45257320}, {"filename": "/data/opening/open.tga.gz", "start": 45257320, "end": 45366188}, {"filename": "/data/opening/scrawl_s.fnt", "start": 45366188, "end": 45370284}, {"filename": "/data/opening/scrawl_w.fnt", "start": 45370284, "end": 45374380}, {"filename": "/data/opening/text1", "start": 45374380, "end": 45374914}, {"filename": "/data/opening/text2", "start": 45374914, "end": 45375738}, {"filename": "/data/opening/text3", "start": 45375738, "end": 45376279}, {"filename": "/data/opening/winfont_16x16.fnt", "start": 45376279, "end": 45386147}, {"filename": "/data/opening/winfont_8x8.fnt", "start": 45386147, "end": 45390910}, {"filename": "/data/rosegarden/02 - Robert van Herk - City Blues.rg", "start": 45390910, "end": 45422577}, {"filename": "/data/rosegarden/03 - Robert van Herk - Architectural Contemplations.rg", "start": 45422577, "end": 45441118}, {"filename": "/data/sounds/Blacksmith1.wav", "start": 45441118, "end": 45617592, "audio": 1}, {"filename": "/data/sounds/Blacksmith2.wav", "start": 45617592, "end": 45705800, "audio": 1}, {"filename": "/data/sounds/Blacksmith3.wav", "start": 45705800, "end": 45882494, "audio": 1}, {"filename": "/data/sounds/Build1.wav", "start": 45882494, "end": 45921804, "audio": 1}, {"filename": "/data/sounds/Build2.wav", "start": 45921804, "end": 45965968, "audio": 1}, {"filename": "/data/sounds/Click.wav", "start": 45965968, "end": 45970700, "audio": 1}, {"filename": "/data/sounds/CoalMine1.wav", "start": 45970700, "end": 46048412, "audio": 1}, {"filename": "/data/sounds/CoalMine2.wav", "start": 46048412, "end": 46160860, "audio": 1}, {"filename": "/data/sounds/CoalMine3.wav", "start": 46160860, "end": 46249124, "audio": 1}, {"filename": "/data/sounds/Commune1.wav", "start": 46249124, "end": 46286230, "audio": 1}, {"filename": "/data/sounds/Commune2.wav", "start": 46286230, "end": 46374594, "audio": 1}, {"filename": "/data/sounds/Commune3.wav", "start": 46374594, "end": 46462922, "audio": 1}, {"filename": "/data/sounds/DirtTrack1.wav", "start": 46462922, "end": 46551378, "audio": 1}, {"filename": "/data/sounds/DirtTrack2.wav", "start": 46551378, "end": 46992422, "audio": 1}, {"filename": "/data/sounds/DirtTrack3.wav", "start": 46992422, "end": 47080598, "audio": 1}, {"filename": "/data/sounds/Farm1.wav", "start": 47080598, "end": 47169322, "audio": 1}, {"filename": "/data/sounds/Farm2.wav", "start": 47169322, "end": 47610366, "audio": 1}, {"filename": "/data/sounds/Farm3.wav", "start": 47610366, "end": 47698750, "audio": 1}, {"filename": "/data/sounds/Fire1.wav", "start": 47698750, "end": 47787088, "audio": 1}, {"filename": "/data/sounds/Fire2.wav", "start": 47787088, "end": 47875326, "audio": 1}, {"filename": "/data/sounds/Fire3.wav", "start": 47875326, "end": 48316370, "audio": 1}, {"filename": "/data/sounds/FireStation1.wav", "start": 48316370, "end": 48404736, "audio": 1}, {"filename": "/data/sounds/FireStation2.wav", "start": 48404736, "end": 48493092, "audio": 1}, {"filename": "/data/sounds/FireStation3.wav", "start": 48493092, "end": 48581382, "audio": 1}, {"filename": "/data/sounds/FireWasteland1.wav", "start": 48581382, "end": 48624706, "audio": 1}, {"filename": "/data/sounds/Green1.wav", "start": 48624706, "end": 48712990, "audio": 1}, {"filename": "/data/sounds/Green2.wav", "start": 48712990, "end": 48801266, "audio": 1}, {"filename": "/data/sounds/Green3.wav", "start": 48801266, "end": 48881188, "audio": 1}, {"filename": "/data/sounds/Green4.wav", "start": 48881188, "end": 48969810, "audio": 1}, {"filename": "/data/sounds/Harbor1.wav", "start": 48969810, "end": 49044606, "audio": 1}, {"filename": "/data/sounds/Harbor2.wav", "start": 49044606, "end": 49132974, "audio": 1}, {"filename": "/data/sounds/Harbor3.wav", "start": 49132974, "end": 49221228, "audio": 1}, {"filename": "/data/sounds/Health1.wav", "start": 49221228, "end": 49342104, "audio": 1}, {"filename": "/data/sounds/Health2.wav", "start": 49342104, "end": 49427254, "audio": 1}, {"filename": "/data/sounds/Health3.wav", "start": 49427254, "end": 49515618, "audio": 1}, {"filename": "/data/sounds/Health4.wav", "start": 49515618, "end": 49603470, "audio": 1}, {"filename": "/data/sounds/Health5.wav", "start": 49603470, "end": 49684926, "audio": 1}, {"filename": "/data/sounds/IndustryHigh1.wav", "start": 49684926, "end": 49773344, "audio": 1}, {"filename": "/data/sounds/IndustryHigh2.wav", "start": 49773344, "end": 49910400, "audio": 1}, {"filename": "/data/sounds/IndustryHigh3.wav", "start": 49910400, "end": 49998614, "audio": 1}, {"filename": "/data/sounds/IndustryLight1.wav", "start": 49998614, "end": 50083060, "audio": 1}, {"filename": "/data/sounds/IndustryLight2.wav", "start": 50083060, "end": 50171304, "audio": 1}, {"filename": "/data/sounds/IndustryLight3.wav", "start": 50171304, "end": 50259594, "audio": 1}, {"filename": "/data/sounds/MarketEmpty1.wav", "start": 50259594, "end": 50347792, "audio": 1}, {"filename": "/data/sounds/MarketFull1.wav", "start": 50347792, "end": 51054396, "audio": 1}, {"filename": "/data/sounds/MarketLow1.wav", "start": 51054396, "end": 51117524, "audio": 1}, {"filename": "/data/sounds/MarketMed1.wav", "start": 51117524, "end": 51205862, "audio": 1}, {"filename": "/data/sounds/Mill1.wav", "start": 51205862, "end": 51294132, "audio": 1}, {"filename": "/data/sounds/Mill2.wav", "start": 51294132, "end": 51354592, "audio": 1}, {"filename": "/data/sounds/Mill3.wav", "start": 51354592, "end": 51442914, "audio": 1}, {"filename": "/data/sounds/Monument1.wav", "start": 51442914, "end": 51530202, "audio": 1}, {"filename": "/data/sounds/Monument2.wav", "start": 51530202, "end": 51594270, "audio": 1}, {"filename": "/data/sounds/Monument3.wav", "start": 51594270, "end": 51770668, "audio": 1}, {"filename": "/data/sounds/MonumentConstruction1.wav", "start": 51770668, "end": 51858968, "audio": 1}, {"filename": "/data/sounds/MonumentConstruction2.wav", "start": 51858968, "end": 51923012, "audio": 1}, {"filename": "/data/sounds/MonumentConstruction3.wav", "start": 51923012, "end": 52011244, "audio": 1}, {"filename": "/data/sounds/OreMine1.wav", "start": 52011244, "end": 52099606, "audio": 1}, {"filename": "/data/sounds/OreMine2.wav", "start": 52099606, "end": 52174282, "audio": 1}, {"filename": "/data/sounds/OreMine3.wav", "start": 52174282, "end": 52262672, "audio": 1}, {"filename": "/data/sounds/OrganicFarm1.wav", "start": 52262672, "end": 52341648, "audio": 1}, {"filename": "/data/sounds/OrganicFarm2.wav", "start": 52341648, "end": 52429576, "audio": 1}, {"filename": "/data/sounds/OrganicFarm3.wav", "start": 52429576, "end": 52517722, "audio": 1}, {"filename": "/data/sounds/ParklandLake1.wav", "start": 52517722, "end": 52606004, "audio": 1}, {"filename": "/data/sounds/ParklandLake2.wav", "start": 52606004, "end": 52691424, "audio": 1}, {"filename": "/data/sounds/ParklandPlane1.wav", "start": 52691424, "end": 52779348, "audio": 1}, {"filename": "/data/sounds/ParklandPlane2.wav", "start": 52779348, "end": 52867614, "audio": 1}, {"filename": "/data/sounds/ParklandPlane3.wav", "start": 52867614, "end": 52955934, "audio": 1}, {"filename": "/data/sounds/Pottery1.wav", "start": 52955934, "end": 52984778, "audio": 1}, {"filename": "/data/sounds/Pottery2.wav", "start": 52984778, "end": 52999926, "audio": 1}, {"filename": "/data/sounds/PowerCoalEmpty.wav", "start": 52999926, "end": 53088184, "audio": 1}, {"filename": "/data/sounds/PowerCoalFull.wav", "start": 53088184, "end": 53176664, "audio": 1}, {"filename": "/data/sounds/PowerCoalLow.wav", "start": 53176664, "end": 53264918, "audio": 1}, {"filename": "/data/sounds/PowerCoalMed.wav", "start": 53264918, "end": 53353188, "audio": 1}, {"filename": "/data/sounds/PowerLine1.wav", "start": 53353188, "end": 53387786, "audio": 1}, {"filename": "/data/sounds/PowerSolar1.wav", "start": 53387786, "end": 53542904, "audio": 1}, {"filename": "/data/sounds/PowerSolar2.wav", "start": 53542904, "end": 53631284, "audio": 1}, {"filename": "/data/sounds/PowerSolar3.wav", "start": 53631284, "end": 53681646, "audio": 1}, {"filename": "/data/sounds/RailTrain1.wav", "start": 53681646, "end": 53768438, "audio": 1}, {"filename": "/data/sounds/RailTrain2.wav", "start": 53768438, "end": 53856750, "audio": 1}, {"filename": "/data/sounds/RailTrain3.wav", "start": 53856750, "end": 53945176, "audio": 1}, {"filename": "/data/sounds/Raze1.wav", "start": 53945176, "end": 53960656, "audio": 1}, {"filename": "/data/sounds/Raze2.wav", "start": 53960656, "end": 53982838, "audio": 1}, {"filename": "/data/sounds/Raze3.wav", "start": 53982838, "end": 54004950, "audio": 1}, {"filename": "/data/sounds/Recycle1.wav", "start": 54004950, "end": 54093254, "audio": 1}, {"filename": "/data/sounds/Recycle2.wav", "start": 54093254, "end": 54181660, "audio": 1}, {"filename": "/data/sounds/Recycle3.wav", "start": 54181660, "end": 54358044, "audio": 1}, {"filename": "/data/sounds/ResidentialHigh1.wav", "start": 54358044, "end": 54446400, "audio": 1}, {"filename": "/data/sounds/ResidentialHigh2.wav", "start": 54446400, "end": 54534822, "audio": 1}, {"filename": "/data/sounds/ResidentialHigh3.wav", "start": 54534822, "end": 54623212, "audio": 1}, {"filename": "/data/sounds/ResidentialLow1.wav", "start": 54623212, "end": 54710270, "audio": 1}, {"filename": "/data/sounds/ResidentialLow2.wav", "start": 54710270, "end": 54795854, "audio": 1}, {"filename": "/data/sounds/ResidentialLow3.wav", "start": 54795854, "end": 54823368, "audio": 1}, {"filename": "/data/sounds/ResidentialLowLow1.wav", "start": 54823368, "end": 54999912, "audio": 1}, {"filename": "/data/sounds/ResidentialMed1.wav", "start": 54999912, "end": 55088246, "audio": 1}, {"filename": "/data/sounds/ResidentialMed2.wav", "start": 55088246, "end": 55176870, "audio": 1}, {"filename": "/data/sounds/ResidentialMed3.wav", "start": 55176870, "end": 55262058, "audio": 1}, {"filename": "/data/sounds/Rocket1.wav", "start": 55262058, "end": 55435156, "audio": 1}, {"filename": "/data/sounds/Rocket2.wav", "start": 55435156, "end": 55523462, "audio": 1}, {"filename": "/data/sounds/Rocket3.wav", "start": 55523462, "end": 55700186, "audio": 1}, {"filename": "/data/sounds/Rocket4.wav", "start": 55700186, "end": 55788490, "audio": 1}, {"filename": "/data/sounds/RocketExplosion1.wav", "start": 55788490, "end": 55876854, "audio": 1}, {"filename": "/data/sounds/RocketTakeoff1.wav", "start": 55876854, "end": 55965210, "audio": 1}, {"filename": "/data/sounds/School1.wav", "start": 55965210, "end": 56141644, "audio": 1}, {"filename": "/data/sounds/School2.wav", "start": 56141644, "end": 56217962, "audio": 1}, {"filename": "/data/sounds/School3.wav", "start": 56217962, "end": 56306236, "audio": 1}, {"filename": "/data/sounds/Shanty1.wav", "start": 56306236, "end": 56394580, "audio": 1}, {"filename": "/data/sounds/Shanty2.wav", "start": 56394580, "end": 56438228, "audio": 1}, {"filename": "/data/sounds/Shanty3.wav", "start": 56438228, "end": 56533230, "audio": 1}, {"filename": "/data/sounds/Shanty4.wav", "start": 56533230, "end": 56620720, "audio": 1}, {"filename": "/data/sounds/Shanty5.wav", "start": 56620720, "end": 56710530, "audio": 1}, {"filename": "/data/sounds/SportsCroud1.wav", "start": 56710530, "end": 56887154, "audio": 1}, {"filename": "/data/sounds/SportsCroud2.wav", "start": 56887154, "end": 57063602, "audio": 1}, {"filename": "/data/sounds/SportsCroud3.wav", "start": 57063602, "end": 57240330, "audio": 1}, {"filename": "/data/sounds/Substation3.wav", "start": 57240330, "end": 57383724, "audio": 1}, {"filename": "/data/sounds/Substation4.wav", "start": 57383724, "end": 57640202, "audio": 1}, {"filename": "/data/sounds/SubstationOff.wav", "start": 57640202, "end": 57705932, "audio": 1}, {"filename": "/data/sounds/SubstationOn.wav", "start": 57705932, "end": 57766252, "audio": 1}, {"filename": "/data/sounds/Tip1.wav", "start": 57766252, "end": 57854422, "audio": 1}, {"filename": "/data/sounds/Tip2.wav", "start": 57854422, "end": 57966870, "audio": 1}, {"filename": "/data/sounds/Tip3.wav", "start": 57966870, "end": 58030894, "audio": 1}, {"filename": "/data/sounds/TraficHigh1.wav", "start": 58030894, "end": 58119196, "audio": 1}, {"filename": "/data/sounds/TraficHigh2.wav", "start": 58119196, "end": 58295572, "audio": 1}, {"filename": "/data/sounds/TraficHigh3.wav", "start": 58295572, "end": 58383868, "audio": 1}, {"filename": "/data/sounds/TraficLow1.wav", "start": 58383868, "end": 58472106, "audio": 1}, {"filename": "/data/sounds/TraficLow2.wav", "start": 58472106, "end": 58646198, "audio": 1}, {"filename": "/data/sounds/TraficLow3.wav", "start": 58646198, "end": 58728950, "audio": 1}, {"filename": "/data/sounds/University1.wav", "start": 58728950, "end": 58817208, "audio": 1}, {"filename": "/data/sounds/University2.wav", "start": 58817208, "end": 58904592, "audio": 1}, {"filename": "/data/sounds/University3.wav", "start": 58904592, "end": 58987212, "audio": 1}, {"filename": "/data/sounds/Water1.wav", "start": 58987212, "end": 59075654, "audio": 1}, {"filename": "/data/sounds/Water2.wav", "start": 59075654, "end": 59163908, "audio": 1}, {"filename": "/data/sounds/Water3.wav", "start": 59163908, "end": 59248918, "audio": 1}, {"filename": "/data/sounds/Water4.wav", "start": 59248918, "end": 59337324, "audio": 1}, {"filename": "/data/sounds/Water5.wav", "start": 59337324, "end": 59425692, "audio": 1}, {"filename": "/data/sounds/WindMill1.wav", "start": 59425692, "end": 59503244, "audio": 1}, {"filename": "/data/sounds/WindMill2.wav", "start": 59503244, "end": 59590556, "audio": 1}, {"filename": "/data/sounds/WindMill3.wav", "start": 59590556, "end": 59678802, "audio": 1}, {"filename": "/data/sounds/WindMillHTech1.wav", "start": 59678802, "end": 59833920, "audio": 1}, {"filename": "/data/sounds/WindMillHTech2.wav", "start": 59833920, "end": 59922282, "audio": 1}, {"filename": "/data/sounds/WindowClose.wav", "start": 59922282, "end": 59939938, "audio": 1}, {"filename": "/data/sounds/WindowOpen.wav", "start": 59939938, "end": 59963022, "audio": 1}, {"filename": "/data/sounds/sounds.xml", "start": 59963022, "end": 59972836}], "remote_package_size": 59972836});

  })();

// end include: C:\Users\GUILHE~1\AppData\Local\Temp\tmpd0yr9iz1.js
// include: C:\Users\GUILHE~1\AppData\Local\Temp\tmpcjrfodqk.js

    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['$ww'] || (typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD)) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  // end include: C:\Users\GUILHE~1\AppData\Local\Temp\tmpcjrfodqk.js
// include: C:\Users\GUILHE~1\AppData\Local\Temp\tmp9ziw2g07.js

    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach((task) => {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  // end include: C:\Users\GUILHE~1\AppData\Local\Temp\tmp9ziw2g07.js


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');

var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// Base Emscripten EH error class
class EmscriptenEH extends Error {}

class EmscriptenSjLj extends EmscriptenEH {}

class CppException extends EmscriptenEH {
  constructor(excPtr) {
    super(excPtr);
    this.excPtr = excPtr;
    const excInfo = getExceptionMessage(excPtr);
    this.name = excInfo[0];
    this.message = excInfo[1];
  }
}
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'game.wasm';
    if (!isDataURI(f)) {
      return locateFile(f);
    }
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary
      ) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(
      (response) => new Uint8Array(/** @type{!ArrayBuffer} */(response)),
      // Fall back to getBinarySync if readAsync fails
      () => getBinarySync(binaryFile)
    );
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        return false;
    }
  }

  if (!wasmBinaryFile) wasmBinaryFile = findWasmBinary();

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis != 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  656428: ($0) => { const parser = new DOMParser(); const doc = parser.parseFromString(UTF8ToString($0), "text/xml"); window.xmlDocs = window.xmlDocs || []; window.xmlDocs.push({doc: doc, currentNode: doc, currentAttribute: null, closing: false, depth: 0}); return window.xmlDocs.length - 1; },  
 656704: ($0) => { window.xmlDocs[$0] = undefined; },  
 656740: ($0) => { const doc = window.xmlDocs[$0]; return doc.depth; },  
 656794: ($0) => { const doc = window.xmlDocs[$0]; if (doc.closing) { if (doc.currentNode.nodeType == 1) { return 15; } else { return 16; } } else { return doc.currentNode.nodeType; } },  
 656963: ($0) => { const doc = window.xmlDocs[$0]; return doc.currentNode.nodeValue != null; },  
 657041: ($0) => { const doc = window.xmlDocs[$0]; return !doc.currentNode.hasChildNodes(); },  
 657118: ($0) => { const doc = window.xmlDocs[$0]; const str = doc.currentNode.nodeName || ""; const strLength = lengthBytesUTF8(str) + 1; const ptr = Module._malloc(strLength); stringToUTF8(str, ptr, strLength); return ptr; },  
 657328: ($0) => { const doc = window.xmlDocs[$0]; const str = doc.currentNode.nodeValue || ""; const strLength = lengthBytesUTF8(str) + 1; const ptr = Module._malloc(strLength); stringToUTF8(str, ptr, strLength); return ptr; },  
 657539: ($0) => { const doc = window.xmlDocs[$0]; const nextSibling = doc.currentNode.nextSibling; if (nextSibling == null) { return false; } doc.currentNode = nextSibling; doc.closing = false; return true; },  
 657732: ($0) => { const doc = window.xmlDocs[$0]; const currentNode = doc.currentNode; if (doc.closing) { if (currentNode.nextSibling != null) { doc.currentNode = currentNode.nextSibling; doc.closing = false; } else { if (currentNode.parentNode == null) { return false; } doc.currentNode = currentNode.parentNode; doc.depth--; } } else if (doc.currentNode.hasChildNodes()) { doc.currentNode = doc.currentNode.firstChild; doc.depth++; } else { let nextSibling = doc.currentNode.nextSibling; if (nextSibling == null) { if (currentNode.parentNode == null) { return false; } doc.currentNode = currentNode.parentNode; doc.closing = true; doc.depth--; } else { doc.currentNode = nextSibling; } } return true; },  
 658421: ($0) => { const doc = window.xmlDocs[$0]; if (!doc.currentNode.hasAttributes()) { return false; } doc.currentAttribute = 0; return true; },  
 658552: ($0) => { const doc = window.xmlDocs[$0]; if (doc.currentAttribute + 1 >= doc.currentNode.attributes.length) { return false; } doc.currentAttribute++; return true; },  
 658710: ($0) => { const doc = window.xmlDocs[$0]; const str = doc.currentNode.attributes[doc.currentAttribute].name || ""; const strLength = lengthBytesUTF8(str) + 1; const ptr = Module._malloc(strLength); stringToUTF8(str, ptr, strLength); return ptr; },  
 658949: ($0) => { const doc = window.xmlDocs[$0]; const str = doc.currentNode.attributes[doc.currentAttribute].value || ""; const strLength = lengthBytesUTF8(str) + 1; const ptr = Module._malloc(strLength); stringToUTF8(str, ptr, strLength); return ptr; },  
 659189: ($0, $1, $2) => { var w = $0; var h = $1; var pixels = $2; if (!Module['SDL2']) Module['SDL2'] = {}; var SDL2 = Module['SDL2']; if (SDL2.ctxCanvas !== Module['canvas']) { SDL2.ctx = Module['createContext'](Module['canvas'], false, true); SDL2.ctxCanvas = Module['canvas']; } if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) { SDL2.image = SDL2.ctx.createImageData(w, h); SDL2.w = w; SDL2.h = h; SDL2.imageCtx = SDL2.ctx; } var data = SDL2.image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = 0xff; src++; dst += 4; } } else { if (SDL2.data32Data !== data) { SDL2.data32 = new Int32Array(data.buffer); SDL2.data8 = new Uint8Array(data.buffer); SDL2.data32Data = data; } var data32 = SDL2.data32; num = data32.length; data32.set(HEAP32.subarray(src, src + num)); var data8 = SDL2.data8; var i = 3; var j = i + 4*num; if (num % 8 == 0) { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; } } else { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; } } } SDL2.ctx.putImageData(SDL2.image, 0, 0); },  
 660658: ($0, $1, $2, $3, $4) => { var w = $0; var h = $1; var hot_x = $2; var hot_y = $3; var pixels = $4; var canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h; var ctx = canvas.getContext("2d"); var image = ctx.createImageData(w, h); var data = image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = (val >> 24) & 0xff; src++; dst += 4; } } else { var data32 = new Int32Array(data.buffer); num = data32.length; data32.set(HEAP32.subarray(src, src + num)); } ctx.putImageData(image, 0, 0); var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto"; var urlBuf = _malloc(url.length + 1); stringToUTF8(url, urlBuf, url.length + 1); return urlBuf; },  
 661647: ($0) => { if (Module['canvas']) { Module['canvas'].style['cursor'] = UTF8ToString($0); } },  
 661730: () => { if (Module['canvas']) { Module['canvas'].style['cursor'] = 'none'; } },  
 661799: () => { return window.innerWidth; },  
 661829: () => { return window.innerHeight; },  
 661860: () => { if (typeof(AudioContext) !== 'undefined') { return true; } else if (typeof(webkitAudioContext) !== 'undefined') { return true; } return false; },  
 662007: () => { if ((typeof(navigator.mediaDevices) !== 'undefined') && (typeof(navigator.mediaDevices.getUserMedia) !== 'undefined')) { return true; } else if (typeof(navigator.webkitGetUserMedia) !== 'undefined') { return true; } return false; },  
 662241: ($0) => { if(typeof(Module['SDL2']) === 'undefined') { Module['SDL2'] = {}; } var SDL2 = Module['SDL2']; if (!$0) { SDL2.audio = {}; } else { SDL2.capture = {}; } if (!SDL2.audioContext) { if (typeof(AudioContext) !== 'undefined') { SDL2.audioContext = new AudioContext(); } else if (typeof(webkitAudioContext) !== 'undefined') { SDL2.audioContext = new webkitAudioContext(); } if (SDL2.audioContext) { autoResumeAudioContext(SDL2.audioContext); } } return SDL2.audioContext === undefined ? -1 : 0; },  
 662734: () => { var SDL2 = Module['SDL2']; return SDL2.audioContext.sampleRate; },  
 662802: ($0, $1, $2, $3) => { var SDL2 = Module['SDL2']; var have_microphone = function(stream) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); SDL2.capture.silenceTimer = undefined; } SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream); SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1); SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) { if ((SDL2 === undefined) || (SDL2.capture === undefined)) { return; } audioProcessingEvent.outputBuffer.getChannelData(0).fill(0.0); SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode); SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination); SDL2.capture.stream = stream; }; var no_microphone = function(error) { }; SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate); SDL2.capture.silenceBuffer.getChannelData(0).fill(0.0); var silence_callback = function() { SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.silenceTimer = setTimeout(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1000); if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) { navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone); } else if (navigator.webkitGetUserMedia !== undefined) { navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone); } },  
 664454: ($0, $1, $2, $3) => { var SDL2 = Module['SDL2']; SDL2.audio.scriptProcessorNode = SDL2.audioContext['createScriptProcessor']($1, 0, $0); SDL2.audio.scriptProcessorNode['onaudioprocess'] = function (e) { if ((SDL2 === undefined) || (SDL2.audio === undefined)) { return; } SDL2.audio.currentOutputBuffer = e['outputBuffer']; dynCall('vi', $2, [$3]); }; SDL2.audio.scriptProcessorNode['connect'](SDL2.audioContext['destination']); },  
 664864: ($0, $1) => { var SDL2 = Module['SDL2']; var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c); if (channelData.length != $1) { throw 'Web Audio capture buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } if (numChannels == 1) { for (var j = 0; j < $1; ++j) { setValue($0 + (j * 4), channelData[j], 'float'); } } else { for (var j = 0; j < $1; ++j) { setValue($0 + (((j * numChannels) + c) * 4), channelData[j], 'float'); } } } },  
 665469: ($0, $1) => { var SDL2 = Module['SDL2']; var numChannels = SDL2.audio.currentOutputBuffer['numberOfChannels']; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.audio.currentOutputBuffer['getChannelData'](c); if (channelData.length != $1) { throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } for (var j = 0; j < $1; ++j) { channelData[j] = HEAPF32[$0 + ((j*numChannels + c) << 2) >> 2]; } } },  
 665949: ($0) => { var SDL2 = Module['SDL2']; if ($0) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); } if (SDL2.capture.stream !== undefined) { var tracks = SDL2.capture.stream.getAudioTracks(); for (var i = 0; i < tracks.length; i++) { SDL2.capture.stream.removeTrack(tracks[i]); } SDL2.capture.stream = undefined; } if (SDL2.capture.scriptProcessorNode !== undefined) { SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {}; SDL2.capture.scriptProcessorNode.disconnect(); SDL2.capture.scriptProcessorNode = undefined; } if (SDL2.capture.mediaStreamNode !== undefined) { SDL2.capture.mediaStreamNode.disconnect(); SDL2.capture.mediaStreamNode = undefined; } if (SDL2.capture.silenceBuffer !== undefined) { SDL2.capture.silenceBuffer = undefined } SDL2.capture = undefined; } else { if (SDL2.audio.scriptProcessorNode != undefined) { SDL2.audio.scriptProcessorNode.disconnect(); SDL2.audio.scriptProcessorNode = undefined; } SDL2.audio = undefined; } if ((SDL2.audioContext !== undefined) && (SDL2.audio === undefined) && (SDL2.capture === undefined)) { SDL2.audioContext.close(); SDL2.audioContext = undefined; } },  
 667121: ($0) => { var str = UTF8ToString($0) + '\n\n' + 'Abort/Retry/Ignore/AlwaysIgnore? [ariA] :'; var reply = window.prompt(str, "i"); if (reply === null) { reply = "i"; } return allocate(intArrayFromString(reply), 'i8', ALLOC_NORMAL); },  
 667346: () => { return navigator.maxTouchPoints > 1; },  
 667387: () => { document.getElementById("fileInput").click(); },  
 667437: ($0) => { const filename = UTF8ToString($0); const data = Module.FS.readFile("/" + filename); const blob = new Blob([data], { type: "application/octet-stream" }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); },  
 667806: () => { window.setTimeout(function() {location.reload();}, 1000); }
};

// end include: preamble.js


  var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!Browser.mainLoop.running) {
        
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var Browser_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          Browser.setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now;
      // Modern environment where performance.now() is supported:
      // N.B. a shorter form "_emscripten_get_now = performance.now;" is
      // unfortunately not allowed even in current browsers (e.g. FF Nightly 75).
      _emscripten_get_now = () => performance.now();
  ;
  
  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
  
      // Closure compiler bug(?): Closure does not see that the assignment
      //   var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      // is a value copy of a number (even with the JSDoc @type annotation)
      // but optimizeis the code as if the assignment was a reference assignment,
      // which results in Browser.mainLoop.pause() not working. Hence use a
      // workaround to make Closure believe this is a value copy that should occur:
      // (TODO: Minimize this down to a small test case and report - was unable
      // to reproduce in a small written test case)
      /** @type{number} */
      var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
        GL.newRenderingFrameStarted();
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        checkStackCookie();
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL == 'object') SDL.audio?.queueNewAudioData?.();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };
  
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  
  var Browser = {
  mainLoop:{
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  pause() {
          Browser.mainLoop.scheduler = null;
          // Incrementing this signals the previous main loop that it's now become old, and it must return.
          Browser.mainLoop.currentlyRunningMainloop++;
        },
  resume() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          // do not set timing and call scheduler, we will do it on the next lines
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },
  updateStatus() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },
  runIter(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          callUserCallback(func);
          Module['postMainLoop']?.();
        },
  },
  useWebGL:false,
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module['noImageDecoding'] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module['noAudioDecoding'] && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Browser.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  safeRequestAnimationFrame(func) {
        
        return Browser.requestAnimationFrame(() => {
          
          callUserCallback(func);
        });
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var rect = Module["canvas"].getBoundingClientRect();
        var cw = Module["canvas"].width;
        var ch = Module["canvas"].height;
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // add the mouse delta to the current absolute mouse position
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };


  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();


  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var exceptionCaught =  [];
  
  
  
  var uncaughtExceptionCount = 0;
  var ___cxa_begin_catch = (ptr) => {
      var info = new ExceptionInfo(ptr);
      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }
      info.set_rethrown(false);
      exceptionCaught.push(info);
      ___cxa_increment_exception_refcount(ptr);
      return ___cxa_get_exception_ptr(ptr);
    };

  
  var exceptionLast = 0;
  
  
  var ___cxa_end_catch = () => {
      // Clear state flag.
      _setThrew(0, 0);
      assert(exceptionCaught.length > 0);
      // Call destructor if one is registered then clear it.
      var info = exceptionCaught.pop();
  
      ___cxa_decrement_exception_refcount(info.excPtr);
      exceptionLast = 0; // XXX in decRef?
    };

  
  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  
  var ___resumeException = (ptr) => {
      if (!exceptionLast) {
        exceptionLast = new CppException(ptr);
      }
      throw exceptionLast;
    };
  
  
  var setTempRet0 = (val) => __emscripten_tempret_set(val);
  var findMatchingCatch = (args) => {
      var thrown =
        exceptionLast?.excPtr;
      if (!thrown) {
        // just pass through the null ptr
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        // just pass through the thrown ptr
        setTempRet0(0);
        return thrown;
      }
  
      // can_catch receives a **, add indirection
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var caughtType of args) {
        if (caughtType === 0 || caughtType === thrownType) {
          // Catch all clause matched or exactly the same type is caught
          break;
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType);
          return thrown;
        }
      }
      setTempRet0(thrownType);
      return thrown;
    };
  var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);

  var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);

  
  
  var ___cxa_rethrow = () => {
      var info = exceptionCaught.pop();
      if (!info) {
        abort('no exception to throw');
      }
      var ptr = info.excPtr;
      if (!info.get_rethrown()) {
        // Only pop if the corresponding push was through rethrow_primary_exception
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++;
      }
      exceptionLast = new CppException(ptr);
      throw exceptionLast;
    };

  
  
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = new CppException(ptr);
      uncaughtExceptionCount++;
      throw exceptionLast;
    };

  var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;


  /** @suppress {duplicate } */
  function syscallGetVarargI() {
      assert(SYSCALLS.varargs != undefined);
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    }
  var syscallGetVarargP = syscallGetVarargI;
  
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  
  
  var IDBFS = {
  dbs:{
  },
  indexedDB:() => {
        if (typeof indexedDB != 'undefined') return indexedDB;
        var ret = null;
        if (typeof window == 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },
  DB_VERSION:21,
  DB_STORE_NAME:"FILE_DATA",
  queuePersist:(mount) => {
        function onPersistComplete() {
          if (mount.idbPersistState === 'again') startPersist(); // If a new sync request has appeared in between, kick off a new sync
          else mount.idbPersistState = 0; // Otherwise reset sync state back to idle to wait for a new sync later
        }
        function startPersist() {
          mount.idbPersistState = 'idb'; // Mark that we are currently running a sync operation
          IDBFS.syncfs(mount, /*populate:*/false, onPersistComplete);
        }
  
        if (!mount.idbPersistState) {
          // Programs typically write/copy/move multiple files in the in-memory
          // filesystem within a single app frame, so when a filesystem sync
          // command is triggered, do not start it immediately, but only after
          // the current frame is finished. This way all the modified files
          // inside the main loop tick will be batched up to the same sync.
          mount.idbPersistState = setTimeout(startPersist, 0);
        } else if (mount.idbPersistState === 'idb') {
          // There is an active IndexedDB sync operation in-flight, but we now
          // have accumulated more files to sync. We should therefore queue up
          // a new sync after the current one finishes so that all writes
          // will be properly persisted.
          mount.idbPersistState = 'again';
        }
      },
  mount:(mount) => {
        // reuse core MEMFS functionality
        var mnt = MEMFS.mount(mount);
        // If the automatic IDBFS persistence option has been selected, then automatically persist
        // all modifications to the filesystem as they occur.
        if (mount?.opts?.autoPersist) {
          mnt.idbPersistState = 0; // IndexedDB sync starts in idle state
          var memfs_node_ops = mnt.node_ops;
          mnt.node_ops = Object.assign({}, mnt.node_ops); // Clone node_ops to inject write tracking
          mnt.node_ops.mknod = (parent, name, mode, dev) => {
            var node = memfs_node_ops.mknod(parent, name, mode, dev);
            // Propagate injected node_ops to the newly created child node
            node.node_ops = mnt.node_ops;
            // Remember for each IDBFS node which IDBFS mount point they came from so we know which mount to persist on modification.
            node.idbfs_mount = mnt.mount;
            // Remember original MEMFS stream_ops for this node
            node.memfs_stream_ops = node.stream_ops;
            // Clone stream_ops to inject write tracking
            node.stream_ops = Object.assign({}, node.stream_ops);
  
            // Track all file writes
            node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
              // This file has been modified, we must persist IndexedDB when this file closes
              stream.node.isModified = true;
              return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
            };
  
            // Persist IndexedDB on file close
            node.stream_ops.close = (stream) => {
              var n = stream.node;
              if (n.isModified) {
                IDBFS.queuePersist(n.idbfs_mount);
                n.isModified = false;
              }
              if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
            };
  
            return node;
          };
          // Also kick off persisting the filesystem on other operations that modify the filesystem.
          mnt.node_ops.mkdir   = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.mkdir(...args));
          mnt.node_ops.rmdir   = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
          mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
          mnt.node_ops.unlink  = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
          mnt.node_ops.rename  = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
        }
        return mnt;
      },
  syncfs:(mount, populate, callback) => {
        IDBFS.getLocalSet(mount, (err, local) => {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, (err, remote) => {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },
  quit:() => {
        Object.values(IDBFS.dbs).forEach((value) => value.close());
        IDBFS.dbs = {};
      },
  getDB:(name, callback) => {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = (e) => {
          var db = /** @type {IDBDatabase} */ (e.target.result);
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = () => {
          db = /** @type {IDBDatabase} */ (req.result);
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  getLocalSet:(mount, callback) => {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return (p) => PATH.join2(root, p);
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { 'timestamp': stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },
  getRemoteSet:(mount, callback) => {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, (err, db) => {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = (e) => {
              callback(e.target.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = (event) => {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db, entries });
              }
  
              entries[cursor.primaryKey] = { 'timestamp': cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },
  loadLocalEntry:(path, callback) => {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode, 'contents': node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },
  storeLocalEntry:(path, entry, callback) => {
        try {
          if (FS.isDir(entry['mode'])) {
            FS.mkdirTree(path, entry['mode']);
          } else if (FS.isFile(entry['mode'])) {
            FS.writeFile(path, entry['contents'], { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry['mode']);
          FS.utime(path, entry['timestamp'], entry['timestamp']);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },
  removeLocalEntry:(path, callback) => {
        try {
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },
  loadRemoteEntry:(store, path, callback) => {
        var req = store.get(path);
        req.onsuccess = (event) => callback(null, event.target.result);
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  storeRemoteEntry:(store, path, entry, callback) => {
        try {
          var req = store.put(entry, path);
        } catch (e) {
          callback(e);
          return;
        }
        req.onsuccess = (event) => callback();
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  removeRemoteEntry:(store, path, callback) => {
        var req = store.delete(path);
        req.onsuccess = (event) => callback();
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  reconcile:(src, dst, callback) => {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach((key) => {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e['timestamp'].getTime() != e2['timestamp'].getTime()) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach((key) => {
          if (!src.entries[key]) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err && !errored) {
            errored = true;
            return callback(err);
          }
        };
  
        // transaction may abort if (for example) there is a QuotaExceededError
        transaction.onerror = transaction.onabort = (e) => {
          done(e.target.error);
          e.preventDefault();
        };
  
        transaction.oncomplete = (e) => {
          if (!errored) {
            callback(null);
          }
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      },
  };
  
  
  
  var strError = (errno) => {
      return UTF8ToString(_strerror(errno));
    };
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          // TODO(sbc): Use the inline member declaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  FSStream:class {
        constructor() {
          // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
          // Use inline field declarations.
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
          this.readMode = 292 | 73;
          this.writeMode = 146;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend 
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams(input, output, error) {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (input) {
          FS.createDevice('/dev', 'stdin', input);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (output) {
          FS.createDevice('/dev', 'stdout', null, output);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (error) {
          FS.createDevice('/dev', 'stderr', null, error);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
        };
      },
  init(input, output, error) {
        assert(!FS.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input ??= Module['stdin'];
        output ??= Module['stdout'];
        error ??= Module['stderr'];
  
        FS.createStandardStreams(input, output, error);
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble = stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble = Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000 * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble = Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000 * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble = Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000 * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble = stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0; // Pretend that the locking is successful.
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  function ___syscall_getdents64(fd, dirp, count) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd)
      stream.getdents ||= FS.readdir(stream.path);
  
      var struct_size = 280;
      var pos = 0;
      var off = FS.llseek(stream, 0, 1);
  
      var idx = Math.floor(off / struct_size);
  
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id;
        var type;
        var name = stream.getdents[idx];
        if (name === '.') {
          id = stream.node.id;
          type = 4; // DT_DIR
        }
        else if (name === '..') {
          var lookup = FS.lookupPath(stream.path, { parent: true });
          id = lookup.node.id;
          type = 4; // DT_DIR
        }
        else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        assert(id);
        (tempI64 = [id>>>0,(tempDouble = id,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((dirp + pos)>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(4))>>2)] = tempI64[1]);
        (tempI64 = [(idx + 1) * struct_size>>>0,(tempDouble = (idx + 1) * struct_size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((dirp + pos)+(8))>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(12))>>2)] = tempI64[1]);
        HEAP16[(((dirp + pos)+(16))>>1)] = 280;
        HEAP8[(dirp + pos)+(18)] = type;
        stringToUTF8(name, dirp + pos + 19, 256);
        pos += struct_size;
        idx += 1;
      }
      FS.llseek(stream, idx * struct_size, 0);
      return pos;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var __abort_js = () => {
      abort('native code called abort()');
    };

  var nowIsMonotonic = 1;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  var __emscripten_throw_longjmp = () => {
      throw new EmscriptenSjLj;
    };

  
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };

  
  var EGL = {
  errorCode:12288,
  defaultDisplayInitialized:false,
  currentContext:0,
  currentReadSurface:0,
  currentDrawSurface:0,
  contextAttributes:{
  alpha:false,
  depth:false,
  stencil:false,
  antialias:false,
  },
  stringCache:{
  },
  setErrorCode(code) {
        EGL.errorCode = code;
      },
  chooseConfig(display, attribList, config, config_size, numConfigs) {
        if (display != 62000) {
          EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
          return 0;
        }
  
        if (attribList) {
          // read attribList if it is non-null
          for (;;) {
            var param = HEAP32[((attribList)>>2)];
            if (param == 0x3021 /*EGL_ALPHA_SIZE*/) {
              var alphaSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.alpha = (alphaSize > 0);
            } else if (param == 0x3025 /*EGL_DEPTH_SIZE*/) {
              var depthSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.depth = (depthSize > 0);
            } else if (param == 0x3026 /*EGL_STENCIL_SIZE*/) {
              var stencilSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.stencil = (stencilSize > 0);
            } else if (param == 0x3031 /*EGL_SAMPLES*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples > 0);
            } else if (param == 0x3032 /*EGL_SAMPLE_BUFFERS*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples == 1);
            } else if (param == 0x3100 /*EGL_CONTEXT_PRIORITY_LEVEL_IMG*/) {
              var requestedPriority = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.lowLatency = (requestedPriority != 0x3103 /*EGL_CONTEXT_PRIORITY_LOW_IMG*/);
            } else if (param == 0x3038 /*EGL_NONE*/) {
                break;
            }
            attribList += 8;
          }
        }
  
        if ((!config || !config_size) && !numConfigs) {
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
        }
        if (numConfigs) {
          HEAP32[((numConfigs)>>2)] = 1; // Total number of supported configs: 1.
        }
        if (config && config_size > 0) {
          HEAPU32[((config)>>2)] = 62002;
        }
  
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      },
  };
  var _eglBindAPI = (api) => {
      if (api == 0x30A0 /* EGL_OPENGL_ES_API */) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      }
      // if (api == 0x30A1 /* EGL_OPENVG_API */ || api == 0x30A2 /* EGL_OPENGL_API */) {
      EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
      return 0;
    };

  var _eglChooseConfig = (display, attrib_list, configs, config_size, numConfigs) => {
      return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
    };

  var GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) => {
      return !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
    };
  
  var webgl_enable_EXT_clip_control = (ctx) => {
      return !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
    };
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) => {
      return !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
    };
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  byteSizeByTypeRoot:5120,
  byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],
  stringCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  MAX_TEMP_BUFFER_SIZE:2097152,
  numTempVertexBuffersPerSize:64,
  log2ceilLookup:(i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
  generateTempBuffers:(quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex+1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex+1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex+1;
        for (var i = 0; i <= largestIndex; ++i) {
          context.tempIndexBuffers[i] = null; // Created on-demand
          context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          context.tempVertexBuffers1[i] = [];
          context.tempVertexBuffers2[i] = [];
          var ringbuffer1 = context.tempVertexBuffers1[i];
          var ringbuffer2 = context.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for (var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          context.tempQuadIndexBuffer = GLctx.createBuffer();
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, context.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          context.GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, quadIndexes, 0x88E4 /*GL_STATIC_DRAW*/);
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
        }
      },
  getTempVertexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = (GL.currentContext.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(0x8894 /*GL_ARRAY_BUFFER_BINDING*/);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(0x8892 /*GL_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },
  getTempIndexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
      },
  newRenderingFrameStarted:() => {
        if (!GL.currentContext) {
          return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
          GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  calcBufLength:(size, type, stride, count) => {
        if (stride > 0) {
          return count * stride;  // XXXvlad this is not exactly correct I don't think
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
      },
  usedTempBuffers:[],
  preDrawHandleClientVertexAttribBindings:(count) => {
        GL.resetBufferBinding = false;
  
        // TODO: initial pass to detect ranges we need to upload, might not need
        // an upload per attrib
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
          var cb = GL.currentContext.clientBuffers[i];
          if (!cb.clientside || !cb.enabled) continue;
  
          GL.resetBufferBinding = true;
  
          var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
          var buf = GL.getTempVertexBuffer(size);
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, buf);
          GLctx.bufferSubData(0x8892 /*GL_ARRAY_BUFFER*/,
                                   0,
                                   HEAPU8.subarray(cb.ptr, cb.ptr + size));
          cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
        }
      },
  postDrawHandleClientVertexAttribBindings:() => {
        if (GL.resetBufferBinding) {
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, GL.buffers[GLctx.currentArrayBufferBinding]);
        }
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        context.maxVertexAttribs = context.GLctx.getParameter(0x8869 /*GL_MAX_VERTEX_ATTRIBS*/);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
          context.clientBuffers[i] = {
            enabled: false,
            clientside: false,
            size: 0,
            type: 0,
            normalized: 0,
            stride: 0,
            ptr: 0,
            vertexAttribPointerAdaptor: null,
          };
        }
  
        GL.generateTempBuffers(false, context);
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  var _eglCreateContext = (display, config, hmm, contextAttribs) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
  
      // EGL 1.4 spec says default EGL_CONTEXT_CLIENT_VERSION is GLES1, but this is not supported by Emscripten.
      // So user must pass EGL_CONTEXT_CLIENT_VERSION == 2 to initialize EGL.
      var glesContextVersion = 1;
      for (;;) {
        var param = HEAP32[((contextAttribs)>>2)];
        if (param == 0x3098 /*EGL_CONTEXT_CLIENT_VERSION*/) {
          glesContextVersion = HEAP32[(((contextAttribs)+(4))>>2)];
        } else if (param == 0x3038 /*EGL_NONE*/) {
          break;
        } else {
          /* EGL1.4 specifies only EGL_CONTEXT_CLIENT_VERSION as supported attribute */
          EGL.setErrorCode(0x3004 /*EGL_BAD_ATTRIBUTE*/);
          return 0;
        }
        contextAttribs += 8;
      }
      if (glesContextVersion != 2) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0; /* EGL_NO_CONTEXT */
      }
  
      EGL.contextAttributes.majorVersion = glesContextVersion - 1; // WebGL 1 is GLES 2, WebGL2 is GLES3
      EGL.contextAttributes.minorVersion = 0;
  
      EGL.context = GL.createContext(Module['canvas'], EGL.contextAttributes);
  
      if (EGL.context != 0) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
  
        // Run callbacks so that GL emulation works
        GL.makeContextCurrent(EGL.context);
        Browser.useWebGL = true;
        Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
  
        // Note: This function only creates a context, but it shall not make it active.
        GL.makeContextCurrent(null);
        return 62004;
      } else {
        EGL.setErrorCode(0x3009 /* EGL_BAD_MATCH */); // By the EGL 1.4 spec, an implementation that does not support GLES2 (WebGL in this case), this error code is set.
        return 0; /* EGL_NO_CONTEXT */
      }
    };

  var _eglCreateWindowSurface = (display, config, win, attrib_list) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      // TODO: Examine attrib_list! Parameters that can be present there are:
      // - EGL_RENDER_BUFFER (must be EGL_BACK_BUFFER)
      // - EGL_VG_COLORSPACE (can't be set)
      // - EGL_VG_ALPHA_FORMAT (can't be set)
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 62006; /* Magic ID for Emscripten 'default surface' */
    };

  
  var _eglDestroyContext = (display, context) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (context != 62004) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
  
      GL.deleteContext(EGL.context);
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      if (EGL.currentContext == context) {
        EGL.currentContext = 0;
      }
      return 1 /* EGL_TRUE */;
    };

  var _eglDestroySurface = (display, surface) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (surface != 62006 /* Magic ID for the only EGLSurface supported by Emscripten */) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 1;
      }
      if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0;
      }
      if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1; /* Magic ID for Emscripten 'default surface' */
    };

  var _eglGetConfigAttrib = (display, config, attribute, value) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      if (!value) {
        EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
        return 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      switch (attribute) {
      case 0x3020: // EGL_BUFFER_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.alpha ? 32 : 24;
        return 1;
      case 0x3021: // EGL_ALPHA_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.alpha ? 8 : 0;
        return 1;
      case 0x3022: // EGL_BLUE_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3023: // EGL_GREEN_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3024: // EGL_RED_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3025: // EGL_DEPTH_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.depth ? 24 : 0;
        return 1;
      case 0x3026: // EGL_STENCIL_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.stencil ? 8 : 0;
        return 1;
      case 0x3027: // EGL_CONFIG_CAVEAT
        // We can return here one of EGL_NONE (0x3038), EGL_SLOW_CONFIG (0x3050) or EGL_NON_CONFORMANT_CONFIG (0x3051).
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3028: // EGL_CONFIG_ID
        HEAP32[((value)>>2)] = 62002;
        return 1;
      case 0x3029: // EGL_LEVEL
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302A: // EGL_MAX_PBUFFER_HEIGHT
        HEAP32[((value)>>2)] = 4096;
        return 1;
      case 0x302B: // EGL_MAX_PBUFFER_PIXELS
        HEAP32[((value)>>2)] = 16777216;
        return 1;
      case 0x302C: // EGL_MAX_PBUFFER_WIDTH
        HEAP32[((value)>>2)] = 4096;
        return 1;
      case 0x302D: // EGL_NATIVE_RENDERABLE
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302E: // EGL_NATIVE_VISUAL_ID
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302F: // EGL_NATIVE_VISUAL_TYPE
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3031: // EGL_SAMPLES
        HEAP32[((value)>>2)] = EGL.contextAttributes.antialias ? 4 : 0;
        return 1;
      case 0x3032: // EGL_SAMPLE_BUFFERS
        HEAP32[((value)>>2)] = EGL.contextAttributes.antialias ? 1 : 0;
        return 1;
      case 0x3033: // EGL_SURFACE_TYPE
        HEAP32[((value)>>2)] = 0x4;
        return 1;
      case 0x3034: // EGL_TRANSPARENT_TYPE
        // If this returns EGL_TRANSPARENT_RGB (0x3052), transparency is used through color-keying. No such thing applies to Emscripten canvas.
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3035: // EGL_TRANSPARENT_BLUE_VALUE
      case 0x3036: // EGL_TRANSPARENT_GREEN_VALUE
      case 0x3037: // EGL_TRANSPARENT_RED_VALUE
        // "If EGL_TRANSPARENT_TYPE is EGL_NONE, then the values for EGL_TRANSPARENT_RED_VALUE, EGL_TRANSPARENT_GREEN_VALUE, and EGL_TRANSPARENT_BLUE_VALUE are undefined."
        HEAP32[((value)>>2)] = -1;
        return 1;
      case 0x3039: // EGL_BIND_TO_TEXTURE_RGB
      case 0x303A: // EGL_BIND_TO_TEXTURE_RGBA
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303B: // EGL_MIN_SWAP_INTERVAL
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303C: // EGL_MAX_SWAP_INTERVAL
        HEAP32[((value)>>2)] = 1;
        return 1;
      case 0x303D: // EGL_LUMINANCE_SIZE
      case 0x303E: // EGL_ALPHA_MASK_SIZE
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303F: // EGL_COLOR_BUFFER_TYPE
        // EGL has two types of buffers: EGL_RGB_BUFFER and EGL_LUMINANCE_BUFFER.
        HEAP32[((value)>>2)] = 0x308E;
        return 1;
      case 0x3040: // EGL_RENDERABLE_TYPE
        // A bit combination of EGL_OPENGL_ES_BIT,EGL_OPENVG_BIT,EGL_OPENGL_ES2_BIT and EGL_OPENGL_BIT.
        HEAP32[((value)>>2)] = 0x4;
        return 1;
      case 0x3042: // EGL_CONFORMANT
        // "EGL_CONFORMANT is a mask indicating if a client API context created with respect to the corresponding EGLConfig will pass the required conformance tests for that API."
        HEAP32[((value)>>2)] = 0;
        return 1;
      default:
        EGL.setErrorCode(0x3004 /* EGL_BAD_ATTRIBUTE */);
        return 0;
      }
    };

  var _eglGetDisplay = (nativeDisplayType) => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      // Emscripten EGL implementation "emulates" X11, and eglGetDisplay is
      // expected to accept/receive a pointer to an X11 Display object (or
      // EGL_DEFAULT_DISPLAY).
      if (nativeDisplayType != 0 /* EGL_DEFAULT_DISPLAY */ && nativeDisplayType != 1 /* see library_xlib.js */) {
        return 0; // EGL_NO_DISPLAY
      }
      return 62000;
    };

  var _eglGetError = () => EGL.errorCode;

  var _eglInitialize = (display, majorVersion, minorVersion) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (majorVersion) {
        HEAP32[((majorVersion)>>2)] = 1; // Advertise EGL Major version: '1'
      }
      if (minorVersion) {
        HEAP32[((minorVersion)>>2)] = 4; // Advertise EGL Minor version: '4'
      }
      EGL.defaultDisplayInitialized = true;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };

  
  var _eglMakeCurrent = (display, draw, read, context) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0 /* EGL_FALSE */;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      if (context != 0 && context != 62004) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
      if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006 /* Magic ID for Emscripten 'default surface' */)) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 0;
      }
  
      GL.makeContextCurrent(context ? EGL.context : null);
  
      EGL.currentContext = context;
      EGL.currentDrawSurface = draw;
      EGL.currentReadSurface = read;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1 /* EGL_TRUE */;
    };

  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  
  var _eglQueryString = (display, name) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      if (EGL.stringCache[name]) return EGL.stringCache[name];
      var ret;
      switch (name) {
        case 0x3053 /* EGL_VENDOR */: ret = stringToNewUTF8("Emscripten"); break;
        case 0x3054 /* EGL_VERSION */: ret = stringToNewUTF8("1.4 Emscripten EGL"); break;
        case 0x3055 /* EGL_EXTENSIONS */:  ret = stringToNewUTF8(""); break; // Currently not supporting any EGL extensions.
        case 0x308D /* EGL_CLIENT_APIS */: ret = stringToNewUTF8("OpenGL_ES"); break;
        default:
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
      }
      EGL.stringCache[name] = ret;
      return ret;
    };

  var _eglSwapBuffers = (dpy, surface) => {
  
      if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(0x3001 /* EGL_NOT_INITIALIZED */);
      } else if (!Module.ctx) {
        EGL.setErrorCode(0x3002 /* EGL_BAD_ACCESS */);
      } else if (Module.ctx.isContextLost()) {
        EGL.setErrorCode(0x300E /* EGL_CONTEXT_LOST */);
      } else {
        // According to documentation this does an implicit flush.
        // Due to discussion at https://github.com/emscripten-core/emscripten/pull/1871
        // the flush was removed since this _may_ result in slowing code down.
        //_glFlush();
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1 /* EGL_TRUE */;
      }
      return 0 /* EGL_FALSE */;
    };

  
  var _eglSwapInterval = (display, interval) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
      else _emscripten_set_main_loop_timing(1, interval);
  
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };

  var _eglTerminate = (display) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      EGL.currentContext = 0;
      EGL.currentReadSurface = 0;
      EGL.currentDrawSurface = 0;
      EGL.defaultDisplayInitialized = false;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };

  
  /** @suppress {duplicate } */
  var _eglWaitClient = () => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  var _eglWaitGL = _eglWaitClient;

  var _eglWaitNative = (nativeEngineId) => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i', 'p'];
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };

  var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[emAsmAddr](...args);
    };
  var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);

  var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);

  var _emscripten_cancel_main_loop = () => {
      Browser.mainLoop.pause();
      Browser.mainLoop.func = null;
    };

  var _emscripten_date_now = () => Date.now();

  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  var setLetterbox = (element, topBottom, leftRight) => {
      // Cannot use margin to specify letterboxes in FF or Chrome, since those ignore margins in fullscreen mode.
      element.style.paddingLeft = element.style.paddingRight = leftRight + 'px';
      element.style.paddingTop = element.style.paddingBottom = topBottom + 'px';
    };
  
  var hideEverythingExceptGivenElement = (onlyVisibleElement) => {
      var child = onlyVisibleElement;
      var parent = child.parentNode;
      var hiddenElements = [];
      while (child != document.body) {
        var children = parent.children;
        for (var i = 0; i < children.length; ++i) {
          if (children[i] != child) {
            hiddenElements.push({ node: children[i], displayState: children[i].style.display });
            children[i].style.display = 'none';
          }
        }
        child = parent;
        parent = parent.parentNode;
      }
      return hiddenElements;
    };
  
  var restoreOldWindowedStyle = null;
  
  
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  /** @suppress {duplicate } */
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  var findCanvasEventTarget = findEventTarget;
  var _emscripten_get_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      HEAP32[((width)>>2)] = canvas.width;
      HEAP32[((height)>>2)] = canvas.height;
    };
  
  
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  var getCanvasElementSize = (target) => {
      var sp = stackSave();
      var w = stackAlloc(8);
      var h = w + 4;
  
      var targetInt = stringToUTF8OnStack(target.id);
      var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
      var size = [HEAP32[((w)>>2)], HEAP32[((h)>>2)]];
      stackRestore(sp);
      return size;
    };
  
  
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };
  
  
  
  var setCanvasElementSize = (target, width, height) => {
      if (!target.controlTransferredOffscreen) {
        target.width = width;
        target.height = height;
      } else {
        // This function is being called from high-level JavaScript code instead of asm.js/Wasm,
        // and it needs to synchronously proxy over to another thread, so marshal the string onto the heap to do the call.
        var sp = stackSave();
        var targetInt = stringToUTF8OnStack(target.id);
        _emscripten_set_canvas_element_size(targetInt, width, height);
        stackRestore(sp);
      }
    };
  
  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var registerRestoreOldStyle = (canvas) => {
      var canvasSize = getCanvasElementSize(canvas);
      var oldWidth = canvasSize[0];
      var oldHeight = canvasSize[1];
      var oldCssWidth = canvas.style.width;
      var oldCssHeight = canvas.style.height;
      var oldBackgroundColor = canvas.style.backgroundColor; // Chrome reads color from here.
      var oldDocumentBackgroundColor = document.body.style.backgroundColor; // IE11 reads color from here.
      // Firefox always has black background color.
      var oldPaddingLeft = canvas.style.paddingLeft; // Chrome, FF, Safari
      var oldPaddingRight = canvas.style.paddingRight;
      var oldPaddingTop = canvas.style.paddingTop;
      var oldPaddingBottom = canvas.style.paddingBottom;
      var oldMarginLeft = canvas.style.marginLeft; // IE11
      var oldMarginRight = canvas.style.marginRight;
      var oldMarginTop = canvas.style.marginTop;
      var oldMarginBottom = canvas.style.marginBottom;
      var oldDocumentBodyMargin = document.body.style.margin;
      var oldDocumentOverflow = document.documentElement.style.overflow; // Chrome, Firefox
      var oldDocumentScroll = document.body.scroll; // IE
      var oldImageRendering = canvas.style.imageRendering;
  
      function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement
          || document.webkitFullscreenElement
          ;
        if (!fullscreenElement) {
          document.removeEventListener('fullscreenchange', restoreOldStyle);
  
          // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
          // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
          document.removeEventListener('webkitfullscreenchange', restoreOldStyle);
  
          setCanvasElementSize(canvas, oldWidth, oldHeight);
  
          canvas.style.width = oldCssWidth;
          canvas.style.height = oldCssHeight;
          canvas.style.backgroundColor = oldBackgroundColor; // Chrome
          // IE11 hack: assigning 'undefined' or an empty string to document.body.style.backgroundColor has no effect, so first assign back the default color
          // before setting the undefined value. Setting undefined value is also important, or otherwise we would later treat that as something that the user
          // had explicitly set so subsequent fullscreen transitions would not set background color properly.
          if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = 'white';
          document.body.style.backgroundColor = oldDocumentBackgroundColor; // IE11
          canvas.style.paddingLeft = oldPaddingLeft; // Chrome, FF, Safari
          canvas.style.paddingRight = oldPaddingRight;
          canvas.style.paddingTop = oldPaddingTop;
          canvas.style.paddingBottom = oldPaddingBottom;
          canvas.style.marginLeft = oldMarginLeft; // IE11
          canvas.style.marginRight = oldMarginRight;
          canvas.style.marginTop = oldMarginTop;
          canvas.style.marginBottom = oldMarginBottom;
          document.body.style.margin = oldDocumentBodyMargin;
          document.documentElement.style.overflow = oldDocumentOverflow; // Chrome, Firefox
          document.body.scroll = oldDocumentScroll; // IE
          canvas.style.imageRendering = oldImageRendering;
          if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
  
          if (currentFullscreenStrategy.canvasResizedCallback) {
            getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
          }
        }
      }
      document.addEventListener('fullscreenchange', restoreOldStyle);
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      document.addEventListener('webkitfullscreenchange', restoreOldStyle);
      return restoreOldStyle;
    };
  
  var restoreHiddenElements = (hiddenElements) => {
      for (var elem of hiddenElements) {
        elem.node.style.display = elem.displayState;
      }
    };
  
  var currentFullscreenStrategy = {
  };
  
  
  
  
  
  
  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  var softFullscreenResizeWebGLRenderTarget = () => {
      var dpr = devicePixelRatio;
      var inHiDPIFullscreenMode = currentFullscreenStrategy.canvasResolutionScaleMode == 2;
      var inAspectRatioFixedFullscreenMode = currentFullscreenStrategy.scaleMode == 2;
      var inPixelPerfectFullscreenMode = currentFullscreenStrategy.canvasResolutionScaleMode != 0;
      var inCenteredWithoutScalingFullscreenMode = currentFullscreenStrategy.scaleMode == 3;
      var screenWidth = inHiDPIFullscreenMode ? Math.round(innerWidth*dpr) : innerWidth;
      var screenHeight = inHiDPIFullscreenMode ? Math.round(innerHeight*dpr) : innerHeight;
      var w = screenWidth;
      var h = screenHeight;
      var canvas = currentFullscreenStrategy.target;
      var canvasSize = getCanvasElementSize(canvas);
      var x = canvasSize[0];
      var y = canvasSize[1];
      var topMargin;
  
      if (inAspectRatioFixedFullscreenMode) {
        if (w*y < x*h) h = (w * y / x) | 0;
        else if (w*y > x*h) w = (h * x / y) | 0;
        topMargin = ((screenHeight - h) / 2) | 0;
      }
  
      if (inPixelPerfectFullscreenMode) {
        setCanvasElementSize(canvas, w, h);
        if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, w, h);
      }
  
      // Back to CSS pixels.
      if (inHiDPIFullscreenMode) {
        topMargin /= dpr;
        w /= dpr;
        h /= dpr;
        // Round to nearest 4 digits of precision.
        w = Math.round(w*1e4)/1e4;
        h = Math.round(h*1e4)/1e4;
        topMargin = Math.round(topMargin*1e4)/1e4;
      }
  
      if (inCenteredWithoutScalingFullscreenMode) {
        var t = (innerHeight - jstoi_q(canvas.style.height)) / 2;
        var b = (innerWidth - jstoi_q(canvas.style.width)) / 2;
        setLetterbox(canvas, t, b);
      } else {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        var b = (innerWidth - w) / 2;
        setLetterbox(canvas, topMargin, b);
      }
  
      if (!inCenteredWithoutScalingFullscreenMode && currentFullscreenStrategy.canvasResizedCallback) {
        getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
      }
    };
  
  
  
  
  
  
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
      var restoreOldStyle = registerRestoreOldStyle(target);
      var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
      var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
      var rect = getBoundingClientRect(target);
      var windowedCssWidth = rect.width;
      var windowedCssHeight = rect.height;
      var canvasSize = getCanvasElementSize(target);
      var windowedRttWidth = canvasSize[0];
      var windowedRttHeight = canvasSize[1];
  
      if (strategy.scaleMode == 3) {
        setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
        cssWidth = windowedCssWidth;
        cssHeight = windowedCssHeight;
      } else if (strategy.scaleMode == 2) {
        if (cssWidth*windowedRttHeight < windowedRttWidth*cssHeight) {
          var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
          setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
          cssHeight = desiredCssHeight;
        } else {
          var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
          setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
          cssWidth = desiredCssWidth;
        }
      }
  
      // If we are adding padding, must choose a background color or otherwise Chrome will give the
      // padding a default white color. Do it only if user has not customized their own background color.
      if (!target.style.backgroundColor) target.style.backgroundColor = 'black';
      // IE11 does the same, but requires the color to be set in the document body.
      if (!document.body.style.backgroundColor) document.body.style.backgroundColor = 'black'; // IE11
      // Firefox always shows black letterboxes independent of style color.
  
      target.style.width = cssWidth + 'px';
      target.style.height = cssHeight + 'px';
  
      if (strategy.filteringMode == 1) {
        target.style.imageRendering = 'optimizeSpeed';
        target.style.imageRendering = '-moz-crisp-edges';
        target.style.imageRendering = '-o-crisp-edges';
        target.style.imageRendering = '-webkit-optimize-contrast';
        target.style.imageRendering = 'optimize-contrast';
        target.style.imageRendering = 'crisp-edges';
        target.style.imageRendering = 'pixelated';
      }
  
      var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? devicePixelRatio : 1;
      if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = (cssWidth * dpiScale)|0;
        var newHeight = (cssHeight * dpiScale)|0;
        setCanvasElementSize(target, newWidth, newHeight);
        if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
      }
      return restoreOldStyle;
    };
  
  
  var _emscripten_enter_soft_fullscreen = (target, fullscreenStrategy) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var strategy = {
          scaleMode: HEAP32[((fullscreenStrategy)>>2)],
          canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy)+(4))>>2)],
          filteringMode: HEAP32[(((fullscreenStrategy)+(8))>>2)],
          canvasResizedCallback: HEAP32[(((fullscreenStrategy)+(12))>>2)],
          canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy)+(16))>>2)],
          target,
          softFullscreen: true
      };
  
      var restoreOldStyle = JSEvents_resizeCanvasForFullscreen(target, strategy);
  
      document.documentElement.style.overflow = 'hidden';  // Firefox, Chrome
      document.body.scroll = "no"; // IE11
      document.body.style.margin = '0px'; // Override default document margin area on all browsers.
  
      var hiddenElements = hideEverythingExceptGivenElement(target);
  
      function restoreWindowedState() {
        restoreOldStyle();
        restoreHiddenElements(hiddenElements);
        removeEventListener('resize', softFullscreenResizeWebGLRenderTarget);
        if (strategy.canvasResizedCallback) {
          getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
        }
        currentFullscreenStrategy = 0;
      }
      restoreOldWindowedStyle = restoreWindowedState;
      currentFullscreenStrategy = strategy;
      addEventListener('resize', softFullscreenResizeWebGLRenderTarget);
  
      // Inform the caller that the canvas size has changed.
      if (strategy.canvasResizedCallback) {
        getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
      }
  
      return 0;
    };

  var _emscripten_err = (str) => err(UTF8ToString(str));

  
  
  
  
  var JSEvents_requestFullscreen = (target, strategy) => {
      // EMSCRIPTEN_FULLSCREEN_SCALE_DEFAULT + EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_NONE is a mode where no extra logic is performed to the DOM elements.
      if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        JSEvents_resizeCanvasForFullscreen(target, strategy);
      }
  
      if (target.requestFullscreen) {
        target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        return JSEvents.fullscreenEnabled() ? -3 : -1;
      }
  
      currentFullscreenStrategy = strategy;
  
      if (strategy.canvasResizedCallback) {
        getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
      }
  
      return 0;
    };
  
  var _emscripten_exit_fullscreen = () => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  
      var d = specialHTMLTargets[1];
      if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen();
      } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen();
      } else {
        return -1;
      }
  
      return 0;
    };

  
  var requestPointerLock = (target) => {
      if (target.requestPointerLock) {
        target.requestPointerLock();
      } else {
        // document.body is known to accept pointer lock, so use that to differentiate if the user passed a bad element,
        // or if the whole browser just doesn't support the feature.
        if (document.body.requestPointerLock
          ) {
          return -3;
        }
        return -1;
      }
      return 0;
    };
  var _emscripten_exit_pointerlock = () => {
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(requestPointerLock);
  
      if (document.exitPointerLock) {
        document.exitPointerLock();
      } else {
        return -1;
      }
      return 0;
    };

  
  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };
  
  
  var _emscripten_force_exit = (status) => {
      warnOnce('emscripten_force_exit cannot actually shut down the runtime, as the build does not have EXIT_RUNTIME set');
      __emscripten_runtime_keepalive_clear();
      _exit(status);
    };

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };

  
  
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };

  
  var fillGamepadEventData = (eventStruct, e) => {
      HEAPF64[((eventStruct)>>3)] = e.timestamp;
      for (var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(((eventStruct+i*8)+(16))>>3)] = e.axes[i];
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i].value;
        } else {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i];
        }
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i].pressed;
        } else {
          // Assigning a boolean to HEAP32, that's ok, but Closure would like to warn about it:
          /** @suppress {checkTypes} */
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i] == 1;
        }
      }
      HEAP8[(eventStruct)+(1104)] = e.connected;
      HEAP32[(((eventStruct)+(1108))>>2)] = e.index;
      HEAP32[(((eventStruct)+(8))>>2)] = e.axes.length;
      HEAP32[(((eventStruct)+(12))>>2)] = e.buttons.length;
      stringToUTF8(e.id, eventStruct + 1112, 64);
      stringToUTF8(e.mapping, eventStruct + 1176, 64);
    };
  var _emscripten_get_gamepad_status = (index, gamepadState) => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // INVALID_PARAM is returned on a Gamepad index that never was there.
      if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  
      // NO_DATA is returned on a Gamepad index that was removed.
      // For previously disconnected gamepads there should be an empty slot (null/undefined/false) at the index.
      // This is because gamepads must keep their original position in the array.
      // For example, removing the first of two gamepads produces [null/undefined/false, gamepad].
      if (!JSEvents.lastGamepadState[index]) return -7;
  
      fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
      return 0;
    };

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  var _emscripten_get_heap_max = () => getHeapMax();


  var _emscripten_get_num_gamepads = () => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // N.B. Do not call emscripten_get_num_gamepads() unless having first called emscripten_sample_gamepad_data(), and that has returned EMSCRIPTEN_RESULT_SUCCESS.
      // Otherwise the following line will throw an exception.
      return JSEvents.lastGamepadState.length;
    };

  var getPreloadedImageData = (path, w, h) => {
      path = PATH_FS.resolve(path);
  
      var canvas = /** @type {HTMLCanvasElement} */(preloadedImages[path]);
      if (!canvas) return 0;
  
      var ctx = canvas.getContext("2d");
      var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var buf = _malloc(canvas.width * canvas.height * 4);
  
      HEAPU8.set(image.data, buf);
  
      HEAP32[((w)>>2)] = canvas.width;
      HEAP32[((h)>>2)] = canvas.height;
      return buf;
    };
  
  
  
  var _emscripten_get_preloaded_image_data = (path, w, h) => getPreloadedImageData(UTF8ToString(path), w, h);

  
  
  var _emscripten_get_preloaded_image_data_from_FILE = (file, w, h) => {
      var fd = _fileno(file);
      var stream = FS.getStream(fd);
      if (stream) {
        return getPreloadedImageData(stream.path, w, h);
      }
  
      return 0;
    };

  var _emscripten_get_screen_size = (width, height) => {
      HEAP32[((width)>>2)] = screen.width;
      HEAP32[((height)>>2)] = screen.height;
    };

  /** @suppress {duplicate } */
  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
  var _emscripten_glActiveTexture = _glActiveTexture;

  /** @suppress {duplicate } */
  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
  var _emscripten_glAttachShader = _glAttachShader;

  /** @suppress {duplicate } */
  var _glBeginQueryEXT = (target, id) => {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.queries[id]);
    };
  var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;

  
  /** @suppress {duplicate } */
  var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
  var _emscripten_glBindAttribLocation = _glBindAttribLocation;

  /** @suppress {duplicate } */
  var _glBindBuffer = (target, buffer) => {
      if (target == 0x8892 /*GL_ARRAY_BUFFER*/) {
        GLctx.currentArrayBufferBinding = buffer;
      } else if (target == 0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/) {
        GLctx.currentElementArrayBufferBinding = buffer;
      }
  
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
  var _emscripten_glBindBuffer = _glBindBuffer;

  /** @suppress {duplicate } */
  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };
  var _emscripten_glBindFramebuffer = _glBindFramebuffer;

  /** @suppress {duplicate } */
  var _glBindRenderbuffer = (target, renderbuffer) => {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    };
  var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;

  /** @suppress {duplicate } */
  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };
  var _emscripten_glBindTexture = _glBindTexture;

  
  /** @suppress {duplicate } */
  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
      var ibo = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
      GLctx.currentElementArrayBufferBinding = ibo ? (ibo.name | 0) : 0;
    };
  /** @suppress {duplicate } */
  var _glBindVertexArrayOES = _glBindVertexArray;
  var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;

  /** @suppress {duplicate } */
  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
  var _emscripten_glBlendColor = _glBlendColor;

  /** @suppress {duplicate } */
  var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
  var _emscripten_glBlendEquation = _glBlendEquation;

  /** @suppress {duplicate } */
  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
  var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;

  /** @suppress {duplicate } */
  var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
  var _emscripten_glBlendFunc = _glBlendFunc;

  /** @suppress {duplicate } */
  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
  var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;

  /** @suppress {duplicate } */
  var _glBufferData = (target, size, data, usage) => {
  
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };
  var _emscripten_glBufferData = _glBufferData;

  /** @suppress {duplicate } */
  var _glBufferSubData = (target, offset, size, data) => {
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };
  var _emscripten_glBufferSubData = _glBufferSubData;

  /** @suppress {duplicate } */
  var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
  var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;

  /** @suppress {duplicate } */
  var _glClear = (x0) => GLctx.clear(x0);
  var _emscripten_glClear = _glClear;

  /** @suppress {duplicate } */
  var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
  var _emscripten_glClearColor = _glClearColor;

  /** @suppress {duplicate } */
  var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
  var _emscripten_glClearDepthf = _glClearDepthf;

  /** @suppress {duplicate } */
  var _glClearStencil = (x0) => GLctx.clearStencil(x0);
  var _emscripten_glClearStencil = _glClearStencil;

  /** @suppress {duplicate } */
  var _glClipControlEXT = (origin, depth) => {
      GLctx.extClipControl['clipControlEXT'](origin, depth);
    };
  var _emscripten_glClipControlEXT = _glClipControlEXT;

  /** @suppress {duplicate } */
  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };
  var _emscripten_glColorMask = _glColorMask;

  /** @suppress {duplicate } */
  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
  var _emscripten_glCompileShader = _glCompileShader;

  /** @suppress {duplicate } */
  var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
      // `data` may be null here, which means "allocate uniniitalized space but
      // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
      // final data parameter, so we simply pass a heap view starting at zero
      // effectively uploading whatever happens to be near address zero.  See
      // https://github.com/emscripten-core/emscripten/issues/19300.
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray((data), data+imageSize));
    };
  var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;

  /** @suppress {duplicate } */
  var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray((data), data+imageSize));
    };
  var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };
  var _emscripten_glCreateProgram = _glCreateProgram;

  /** @suppress {duplicate } */
  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };
  var _emscripten_glCreateShader = _glCreateShader;

  /** @suppress {duplicate } */
  var _glCullFace = (x0) => GLctx.cullFace(x0);
  var _emscripten_glCullFace = _glCullFace;

  /** @suppress {duplicate } */
  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GLctx.currentArrayBufferBinding) GLctx.currentArrayBufferBinding = 0;
        if (id == GLctx.currentElementArrayBufferBinding) GLctx.currentElementArrayBufferBinding = 0;
      }
    };
  var _emscripten_glDeleteBuffers = _glDeleteBuffers;

  /** @suppress {duplicate } */
  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };
  var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;

  /** @suppress {duplicate } */
  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
  var _emscripten_glDeleteProgram = _glDeleteProgram;

  /** @suppress {duplicate } */
  var _glDeleteQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var query = GL.queries[id];
        if (!query) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query);
        GL.queries[id] = null;
      }
    };
  var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;

  /** @suppress {duplicate } */
  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };
  var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;

  /** @suppress {duplicate } */
  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };
  var _emscripten_glDeleteShader = _glDeleteShader;

  /** @suppress {duplicate } */
  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };
  var _emscripten_glDeleteTextures = _glDeleteTextures;

  
  /** @suppress {duplicate } */
  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };
  /** @suppress {duplicate } */
  var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
  var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;

  /** @suppress {duplicate } */
  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
  var _emscripten_glDepthFunc = _glDepthFunc;

  /** @suppress {duplicate } */
  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };
  var _emscripten_glDepthMask = _glDepthMask;

  /** @suppress {duplicate } */
  var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
  var _emscripten_glDepthRangef = _glDepthRangef;

  /** @suppress {duplicate } */
  var _glDetachShader = (program, shader) => {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
    };
  var _emscripten_glDetachShader = _glDetachShader;

  /** @suppress {duplicate } */
  var _glDisable = (x0) => GLctx.disable(x0);
  var _emscripten_glDisable = _glDisable;

  /** @suppress {duplicate } */
  var _glDisableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = false;
      GLctx.disableVertexAttribArray(index);
    };
  var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glDrawArrays = (mode, first, count) => {
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(first + count);
  
      GLctx.drawArrays(mode, first, count);
  
      GL.postDrawHandleClientVertexAttribBindings();
    };
  var _emscripten_glDrawArrays = _glDrawArrays;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
  var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;

  
  var tempFixedLengthArray = [];
  
  /** @suppress {duplicate } */
  var _glDrawBuffers = (n, bufs) => {
  
      var bufArray = tempFixedLengthArray[n];
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(((bufs)+(i*4))>>2)];
      }
  
      GLctx.drawBuffers(bufArray);
    };
  /** @suppress {duplicate } */
  var _glDrawBuffersWEBGL = _glDrawBuffers;
  var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;

  /** @suppress {duplicate } */
  var _glDrawElements = (mode, count, type, indices) => {
      var buf;
      var vertexes = 0;
      if (!GLctx.currentElementArrayBufferBinding) {
        var size = GL.calcBufLength(1, type, 0, count);
        buf = GL.getTempIndexBuffer(size);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, buf);
        GLctx.bufferSubData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/,
                            0,
                            HEAPU8.subarray(indices, indices + size));
        
        // Calculating vertex count if shader's attribute data is on client side
        if (count > 0) {
          for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
            var cb = GL.currentContext.clientBuffers[i];
            if (cb.clientside && cb.enabled) {
              let arrayClass;
              switch(type) {
                case 0x1401 /* GL_UNSIGNED_BYTE */: arrayClass = Uint8Array; break;
                case 0x1403 /* GL_UNSIGNED_SHORT */: arrayClass = Uint16Array; break;
                default:
                  GL.recordError(0x502 /* GL_INVALID_OPERATION */);
                  return;
              }
  
              vertexes = new arrayClass(HEAPU8.buffer, indices, count).reduce((max, current) => Math.max(max, current)) + 1;
              break;
            }
          }
        }
  
        // the index is now 0
        indices = 0;
      }
  
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(vertexes);
  
      GLctx.drawElements(mode, count, type, indices);
  
      GL.postDrawHandleClientVertexAttribBindings(count);
  
      if (!GLctx.currentElementArrayBufferBinding) {
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
      }
    };
  var _emscripten_glDrawElements = _glDrawElements;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
  var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;

  /** @suppress {duplicate } */
  var _glEnable = (x0) => GLctx.enable(x0);
  var _emscripten_glEnable = _glEnable;

  /** @suppress {duplicate } */
  var _glEnableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = true;
      GLctx.enableVertexAttribArray(index);
    };
  var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glEndQueryEXT = (target) => {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target);
    };
  var _emscripten_glEndQueryEXT = _glEndQueryEXT;

  /** @suppress {duplicate } */
  var _glFinish = () => GLctx.finish();
  var _emscripten_glFinish = _glFinish;

  /** @suppress {duplicate } */
  var _glFlush = () => GLctx.flush();
  var _emscripten_glFlush = _glFlush;

  /** @suppress {duplicate } */
  var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget,
                                         GL.renderbuffers[renderbuffer]);
    };
  var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;

  /** @suppress {duplicate } */
  var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
      GLctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    };
  var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;

  /** @suppress {duplicate } */
  var _glFrontFace = (x0) => GLctx.frontFace(x0);
  var _emscripten_glFrontFace = _glFrontFace;

  /** @suppress {duplicate } */
  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };
  var _emscripten_glGenBuffers = _glGenBuffers;

  /** @suppress {duplicate } */
  var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, 'createFramebuffer', GL.framebuffers
        );
    };
  var _emscripten_glGenFramebuffers = _glGenFramebuffers;

  /** @suppress {duplicate } */
  var _glGenQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']();
        if (!query) {
          GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          while (i < n) HEAP32[(((ids)+(i++*4))>>2)] = 0;
          return;
        }
        var id = GL.getNewId(GL.queries);
        query.name = id;
        GL.queries[id] = query;
        HEAP32[(((ids)+(i*4))>>2)] = id;
      }
    };
  var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;

  /** @suppress {duplicate } */
  var _glGenRenderbuffers = (n, renderbuffers) => {
      GL.genObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers
        );
    };
  var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;

  /** @suppress {duplicate } */
  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };
  var _emscripten_glGenTextures = _glGenTextures;

  
  /** @suppress {duplicate } */
  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };
  /** @suppress {duplicate } */
  var _glGenVertexArraysOES = _glGenVertexArrays;
  var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;

  /** @suppress {duplicate } */
  var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
  var _emscripten_glGenerateMipmap = _glGenerateMipmap;

  
  var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
      program = GL.programs[program];
      var info = GLctx[funcName](program, index);
      if (info) {
        // If an error occurs, nothing will be written to length, size and type and name.
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
        if (size) HEAP32[((size)>>2)] = info.size;
        if (type) HEAP32[((type)>>2)] = info.type;
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveAttrib', program, index, bufSize, length, size, type, name);
    };
  var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;

  
  /** @suppress {duplicate } */
  var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name);
    };
  var _emscripten_glGetActiveUniform = _glGetActiveUniform;

  /** @suppress {duplicate } */
  var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
      var result = GLctx.getAttachedShaders(GL.programs[program]);
      var len = result.length;
      if (len > maxCount) {
        len = maxCount;
      }
      HEAP32[((count)>>2)] = len;
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        HEAP32[(((shaders)+(i*4))>>2)] = id;
      }
    };
  var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;

  
  /** @suppress {duplicate } */
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };
  var _emscripten_glGetAttribLocation = _glGetAttribLocation;

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
  var _emscripten_glGetBooleanv = _glGetBooleanv;

  /** @suppress {duplicate } */
  var _glGetBufferParameteriv = (target, value, data) => {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null
        // pointer. Since calling this function does not make sense if data ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((data)>>2)] = GLctx.getBufferParameter(target, value);
    };
  var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;

  /** @suppress {duplicate } */
  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };
  var _emscripten_glGetError = _glGetError;

  
  /** @suppress {duplicate } */
  var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
  var _emscripten_glGetFloatv = _glGetFloatv;

  /** @suppress {duplicate } */
  var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
      if (result instanceof WebGLRenderbuffer ||
          result instanceof WebGLTexture) {
        result = result.name | 0;
      }
      HEAP32[((params)>>2)] = result;
    };
  var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
  var _emscripten_glGetIntegerv = _glGetIntegerv;

  /** @suppress {duplicate } */
  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;

  /** @suppress {duplicate } */
  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };
  var _emscripten_glGetProgramiv = _glGetProgramiv;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjecti64vEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param;
      {
        param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      }
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      writeI53ToI64(params, ret);
    };
  var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;

  /** @suppress {duplicate } */
  var _glGetQueryObjectivEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)] = ret;
    };
  var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
  var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
  var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;

  /** @suppress {duplicate } */
  var _glGetQueryivEXT = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname);
    };
  var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;

  /** @suppress {duplicate } */
  var _glGetRenderbufferParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getRenderbufferParameter(target, pname);
    };
  var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;

  /** @suppress {duplicate } */
  var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
      HEAP32[((range)>>2)] = result.rangeMin;
      HEAP32[(((range)+(4))>>2)] = result.rangeMax;
      HEAP32[((precision)>>2)] = result.precision;
    };
  var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;

  /** @suppress {duplicate } */
  var _glGetShaderSource = (shader, bufSize, length, source) => {
      var result = GLctx.getShaderSource(GL.shaders[shader]);
      if (!result) return; // If an error occurs, nothing will be written to length or source.
      var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetShaderSource = _glGetShaderSource;

  /** @suppress {duplicate } */
  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };
  var _emscripten_glGetShaderiv = _glGetShaderiv;

  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  /** @suppress {duplicate } */
  var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 0x1F03 /* GL_EXTENSIONS */:
            ret = stringToNewUTF8(webglGetExtensions().join(' '));
            break;
          case 0x1F00 /* GL_VENDOR */:
          case 0x1F01 /* GL_RENDERER */:
          case 0x9245 /* UNMASKED_VENDOR_WEBGL */:
          case 0x9246 /* UNMASKED_RENDERER_WEBGL */:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(0x500/*GL_INVALID_ENUM*/);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
  
          case 0x1F02 /* GL_VERSION */:
            var webGLVersion = GLctx.getParameter(0x1F02 /*GL_VERSION*/);
            // return GLES version string corresponding to the version of the WebGL context
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
          case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
            var glslVersion = GLctx.getParameter(0x8B8C /*GL_SHADING_LANGUAGE_VERSION*/);
            // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'; // ensure minor version has 2 digits
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(0x500/*GL_INVALID_ENUM*/);
            // fall through
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
  var _emscripten_glGetString = _glGetString;

  /** @suppress {duplicate } */
  var _glGetTexParameterfv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAPF32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;

  /** @suppress {duplicate } */
  var _glGetTexParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;

  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  /** @suppress {duplicate } */
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };
  var _emscripten_glGetUniformLocation = _glGetUniformLocation;

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  
  /** @suppress{checkTypes} */
  var emscriptenWebGLGetUniform = (program, location, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
      webglPrepareUniformLocationsBeforeFirstUse(program);
      var data = GLctx.getUniform(program, webglGetUniformLocation(location));
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
          }
        }
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetUniformfv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 2);
    };
  var _emscripten_glGetUniformfv = _glGetUniformfv;

  
  /** @suppress {duplicate } */
  var _glGetUniformiv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 0);
    };
  var _emscripten_glGetUniformiv = _glGetUniformiv;

  /** @suppress {duplicate } */
  var _glGetVertexAttribPointerv = (index, pname, pointer) => {
      if (!pointer) {
        // GLES2 specification does not specify how to behave if pointer is a null
        // pointer. Since calling this function does not make sense if pointer ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttribPointer on client-side array: not supported, bad data returned");
      }
      HEAP32[((pointer)>>2)] = GLctx.getVertexAttribOffset(index, pname);
    };
  var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;

  /** @suppress{checkTypes} */
  var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
      }
      var data = GLctx.getVertexAttrib(index, pname);
      if (pname == 0x889F/*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/) {
        HEAP32[((params)>>2)] = data && data["name"];
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
          case 5: HEAP32[((params)>>2)] = Math.fround(data); break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
            case 5: HEAP32[(((params)+(i*4))>>2)] = Math.fround(data[i]); break;
          }
        }
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetVertexAttribfv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
    };
  var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;

  
  /** @suppress {duplicate } */
  var _glGetVertexAttribiv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
    };
  var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;

  /** @suppress {duplicate } */
  var _glHint = (x0, x1) => GLctx.hint(x0, x1);
  var _emscripten_glHint = _glHint;

  /** @suppress {duplicate } */
  var _glIsBuffer = (buffer) => {
      var b = GL.buffers[buffer];
      if (!b) return 0;
      return GLctx.isBuffer(b);
    };
  var _emscripten_glIsBuffer = _glIsBuffer;

  /** @suppress {duplicate } */
  var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
  var _emscripten_glIsEnabled = _glIsEnabled;

  /** @suppress {duplicate } */
  var _glIsFramebuffer = (framebuffer) => {
      var fb = GL.framebuffers[framebuffer];
      if (!fb) return 0;
      return GLctx.isFramebuffer(fb);
    };
  var _emscripten_glIsFramebuffer = _glIsFramebuffer;

  /** @suppress {duplicate } */
  var _glIsProgram = (program) => {
      program = GL.programs[program];
      if (!program) return 0;
      return GLctx.isProgram(program);
    };
  var _emscripten_glIsProgram = _glIsProgram;

  /** @suppress {duplicate } */
  var _glIsQueryEXT = (id) => {
      var query = GL.queries[id];
      if (!query) return 0;
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query);
    };
  var _emscripten_glIsQueryEXT = _glIsQueryEXT;

  /** @suppress {duplicate } */
  var _glIsRenderbuffer = (renderbuffer) => {
      var rb = GL.renderbuffers[renderbuffer];
      if (!rb) return 0;
      return GLctx.isRenderbuffer(rb);
    };
  var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;

  /** @suppress {duplicate } */
  var _glIsShader = (shader) => {
      var s = GL.shaders[shader];
      if (!s) return 0;
      return GLctx.isShader(s);
    };
  var _emscripten_glIsShader = _glIsShader;

  /** @suppress {duplicate } */
  var _glIsTexture = (id) => {
      var texture = GL.textures[id];
      if (!texture) return 0;
      return GLctx.isTexture(texture);
    };
  var _emscripten_glIsTexture = _glIsTexture;

  
  /** @suppress {duplicate } */
  var _glIsVertexArray = (array) => {
  
      var vao = GL.vaos[array];
      if (!vao) return 0;
      return GLctx.isVertexArray(vao);
    };
  /** @suppress {duplicate } */
  var _glIsVertexArrayOES = _glIsVertexArray;
  var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;

  /** @suppress {duplicate } */
  var _glLineWidth = (x0) => GLctx.lineWidth(x0);
  var _emscripten_glLineWidth = _glLineWidth;

  /** @suppress {duplicate } */
  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };
  var _emscripten_glLinkProgram = _glLinkProgram;

  /** @suppress {duplicate } */
  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };
  var _emscripten_glPixelStorei = _glPixelStorei;

  /** @suppress {duplicate } */
  var _glPolygonModeWEBGL = (face, mode) => {
      GLctx.webglPolygonMode['polygonModeWEBGL'](face, mode);
    };
  var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;

  /** @suppress {duplicate } */
  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
  var _emscripten_glPolygonOffset = _glPolygonOffset;

  /** @suppress {duplicate } */
  var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
      GLctx.extPolygonOffsetClamp['polygonOffsetClampEXT'](factor, units, clamp);
    };
  var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;

  /** @suppress {duplicate } */
  var _glQueryCounterEXT = (id, target) => {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.queries[id], target);
    };
  var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
      };
      return colorChannels[format - 0x1902]||1;
    };
  
  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
  
      if (type == 1) return HEAPU8;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  
  /** @suppress {duplicate } */
  var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
      if (!pixelData) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    };
  var _emscripten_glReadPixels = _glReadPixels;

  /** @suppress {duplicate } */
  var _glReleaseShaderCompiler = () => {
      // NOP (as allowed by GLES 2.0 spec)
    };
  var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;

  /** @suppress {duplicate } */
  var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
  var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;

  /** @suppress {duplicate } */
  var _glSampleCoverage = (value, invert) => {
      GLctx.sampleCoverage(value, !!invert);
    };
  var _emscripten_glSampleCoverage = _glSampleCoverage;

  /** @suppress {duplicate } */
  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
  var _emscripten_glScissor = _glScissor;

  /** @suppress {duplicate } */
  var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
      GL.recordError(0x500/*GL_INVALID_ENUM*/);
    };
  var _emscripten_glShaderBinary = _glShaderBinary;

  /** @suppress {duplicate } */
  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };
  var _emscripten_glShaderSource = _glShaderSource;

  /** @suppress {duplicate } */
  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
  var _emscripten_glStencilFunc = _glStencilFunc;

  /** @suppress {duplicate } */
  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
  var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;

  /** @suppress {duplicate } */
  var _glStencilMask = (x0) => GLctx.stencilMask(x0);
  var _emscripten_glStencilMask = _glStencilMask;

  /** @suppress {duplicate } */
  var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
  var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;

  /** @suppress {duplicate } */
  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
  var _emscripten_glStencilOp = _glStencilOp;

  /** @suppress {duplicate } */
  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
  var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;

  
  /** @suppress {duplicate } */
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };
  var _emscripten_glTexImage2D = _glTexImage2D;

  /** @suppress {duplicate } */
  var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
  var _emscripten_glTexParameterf = _glTexParameterf;

  /** @suppress {duplicate } */
  var _glTexParameterfv = (target, pname, params) => {
      var param = HEAPF32[((params)>>2)];
      GLctx.texParameterf(target, pname, param);
    };
  var _emscripten_glTexParameterfv = _glTexParameterfv;

  /** @suppress {duplicate } */
  var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
  var _emscripten_glTexParameteri = _glTexParameteri;

  /** @suppress {duplicate } */
  var _glTexParameteriv = (target, pname, params) => {
      var param = HEAP32[((params)>>2)];
      GLctx.texParameteri(target, pname, param);
    };
  var _emscripten_glTexParameteriv = _glTexParameteriv;

  
  /** @suppress {duplicate } */
  var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    };
  var _emscripten_glTexSubImage2D = _glTexSubImage2D;

  
  /** @suppress {duplicate } */
  var _glUniform1f = (location, v0) => {
      GLctx.uniform1f(webglGetUniformLocation(location), v0);
    };
  var _emscripten_glUniform1f = _glUniform1f;

  
  var miniTempWebGLFloatBuffers = [];
  
  /** @suppress {duplicate } */
  var _glUniform1fv = (location, count, value) => {
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform1fv = _glUniform1fv;

  
  /** @suppress {duplicate } */
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };
  var _emscripten_glUniform1i = _glUniform1i;

  
  var miniTempWebGLIntBuffers = [];
  
  /** @suppress {duplicate } */
  var _glUniform1iv = (location, count, value) => {
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform1iv = _glUniform1iv;

  
  /** @suppress {duplicate } */
  var _glUniform2f = (location, v0, v1) => {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
    };
  var _emscripten_glUniform2f = _glUniform2f;

  
  
  /** @suppress {duplicate } */
  var _glUniform2fv = (location, count, value) => {
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform2fv = _glUniform2fv;

  
  /** @suppress {duplicate } */
  var _glUniform2i = (location, v0, v1) => {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
    };
  var _emscripten_glUniform2i = _glUniform2i;

  
  
  /** @suppress {duplicate } */
  var _glUniform2iv = (location, count, value) => {
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform2iv = _glUniform2iv;

  
  /** @suppress {duplicate } */
  var _glUniform3f = (location, v0, v1, v2) => {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
    };
  var _emscripten_glUniform3f = _glUniform3f;

  
  
  /** @suppress {duplicate } */
  var _glUniform3fv = (location, count, value) => {
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform3fv = _glUniform3fv;

  
  /** @suppress {duplicate } */
  var _glUniform3i = (location, v0, v1, v2) => {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
    };
  var _emscripten_glUniform3i = _glUniform3i;

  
  
  /** @suppress {duplicate } */
  var _glUniform3iv = (location, count, value) => {
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform3iv = _glUniform3iv;

  
  /** @suppress {duplicate } */
  var _glUniform4f = (location, v0, v1, v2, v3) => {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  var _emscripten_glUniform4f = _glUniform4f;

  
  
  /** @suppress {duplicate } */
  var _glUniform4fv = (location, count, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[4*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 4;
        for (var i = 0; i < count; i += 4) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform4fv = _glUniform4fv;

  
  /** @suppress {duplicate } */
  var _glUniform4i = (location, v0, v1, v2, v3) => {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  var _emscripten_glUniform4i = _glUniform4i;

  
  
  /** @suppress {duplicate } */
  var _glUniform4iv = (location, count, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAP32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform4iv = _glUniform4iv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix2fv = (location, count, transpose, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix3fv = (location, count, transpose, value) => {
  
      if (count <= 32) {
        // avoid allocation when uploading few enough uniforms
        count *= 9;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 9) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
          view[i+4] = HEAPF32[(((value)+(4*i+16))>>2)];
          view[i+5] = HEAPF32[(((value)+(4*i+20))>>2)];
          view[i+6] = HEAPF32[(((value)+(4*i+24))>>2)];
          view[i+7] = HEAPF32[(((value)+(4*i+28))>>2)];
          view[i+8] = HEAPF32[(((value)+(4*i+32))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*36)>>2));
      }
      GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix4fv = (location, count, transpose, value) => {
  
      if (count <= 18) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[16*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 16;
        for (var i = 0; i < count; i += 16) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
          view[i + 4] = heap[dst + 4];
          view[i + 5] = heap[dst + 5];
          view[i + 6] = heap[dst + 6];
          view[i + 7] = heap[dst + 7];
          view[i + 8] = heap[dst + 8];
          view[i + 9] = heap[dst + 9];
          view[i + 10] = heap[dst + 10];
          view[i + 11] = heap[dst + 11];
          view[i + 12] = heap[dst + 12];
          view[i + 13] = heap[dst + 13];
          view[i + 14] = heap[dst + 14];
          view[i + 15] = heap[dst + 15];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*64)>>2));
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;

  /** @suppress {duplicate } */
  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };
  var _emscripten_glUseProgram = _glUseProgram;

  /** @suppress {duplicate } */
  var _glValidateProgram = (program) => {
      GLctx.validateProgram(GL.programs[program]);
    };
  var _emscripten_glValidateProgram = _glValidateProgram;

  /** @suppress {duplicate } */
  var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
  var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;

  /** @suppress {duplicate } */
  var _glVertexAttrib1fv = (index, v) => {
  
      GLctx.vertexAttrib1f(index, HEAPF32[v>>2]);
    };
  var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
  var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;

  /** @suppress {duplicate } */
  var _glVertexAttrib2fv = (index, v) => {
  
      GLctx.vertexAttrib2f(index, HEAPF32[v>>2], HEAPF32[v+4>>2]);
    };
  var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
  var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;

  /** @suppress {duplicate } */
  var _glVertexAttrib3fv = (index, v) => {
  
      GLctx.vertexAttrib3f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2]);
    };
  var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
  var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;

  /** @suppress {duplicate } */
  var _glVertexAttrib4fv = (index, v) => {
  
      GLctx.vertexAttrib4f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2], HEAPF32[v+12>>2]);
    };
  var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
  var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;

  /** @suppress {duplicate } */
  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
          this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
  var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;

  /** @suppress {duplicate } */
  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
  var _emscripten_glViewport = _glViewport;

  var _emscripten_has_asyncify = () => 0;

  var _emscripten_request_animation_frame_loop = (cb, userData) => {
      function tick(timeStamp) {
        if (getWasmTableEntry(cb)(timeStamp, userData)) {
          requestAnimationFrame(tick);
        }
      }
      return requestAnimationFrame(tick);
    };

  
  
  
  
  
  
  
  var doRequestFullscreen = (target, strategy) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      if (!target.requestFullscreen
        && !target.webkitRequestFullscreen
        ) {
        return -3;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (strategy.deferUntilInEventHandler) {
          JSEvents.deferCall(JSEvents_requestFullscreen, 1 /* priority over pointer lock */, [target, strategy]);
          return 1;
        }
        return -2;
      }
  
      return JSEvents_requestFullscreen(target, strategy);
    };
  
  
  var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
      var strategy = {
        scaleMode: HEAP32[((fullscreenStrategy)>>2)],
        canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy)+(4))>>2)],
        filteringMode: HEAP32[(((fullscreenStrategy)+(8))>>2)],
        deferUntilInEventHandler,
        canvasResizedCallback: HEAP32[(((fullscreenStrategy)+(12))>>2)],
        canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy)+(16))>>2)]
      };
  
      return doRequestFullscreen(target, strategy);
    };

  
  
  var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (!target.requestPointerLock
        ) {
        return -1;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (deferUntilInEventHandler) {
          JSEvents.deferCall(requestPointerLock, 2 /* priority below fullscreen */, [target]);
          return 1;
        }
        return -2;
      }
  
      return requestPointerLock(target);
    };

  
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  /** @suppress {checkTypes} */
  var _emscripten_sample_gamepad_data = () => {
      try {
        if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads())
          ? 0 : -1;
      } catch(e) {
        err(`navigator.getGamepads() exists, but failed to execute with exception ${e}. Disabling Gamepad access.`);
        navigator.getGamepads = null; // Disable getGamepads() so that it won't be attempted to be used again.
      }
      return -1;
    };

  
  
  
  var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
      var beforeUnloadEventHandlerFunc = (e = event) => {
        // Note: This is always called on the main browser thread, since it needs synchronously return a value!
        var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
  
        if (confirmationMessage) {
          confirmationMessage = UTF8ToString(confirmationMessage);
        }
        if (confirmationMessage) {
          e.preventDefault();
          e.returnValue = confirmationMessage;
          return confirmationMessage;
        }
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: beforeUnloadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
      if (typeof onbeforeunload == 'undefined') return -1;
      // beforeunload callback can only be registered on the main browser thread, because the page will go away immediately after returning from the handler,
      // and there is no time to start proxying it anywhere.
      if (targetThread !== 1) return -5;
      return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
    };

  
  
  
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);


  
  var _emscripten_set_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      target.style.width = width + "px";
      target.style.height = height + "px";
  
      return 0;
    };

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  var fillFullscreenChangeEventData = (eventStruct) => {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      var isFullscreen = !!fullscreenElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isFullscreen;
      HEAP8[(eventStruct)+(1)] = JSEvents.fullscreenEnabled();
      // If transitioning to fullscreen, report info about the element that is now fullscreen.
      // If transitioning to windowed mode, report info about the element that just was fullscreen.
      var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
      var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
      var id = reportedElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 2, 128);
      stringToUTF8(id, eventStruct + 130, 128);
      HEAP32[(((eventStruct)+(260))>>2)] = reportedElement ? reportedElement.clientWidth : 0;
      HEAP32[(((eventStruct)+(264))>>2)] = reportedElement ? reportedElement.clientHeight : 0;
      HEAP32[(((eventStruct)+(268))>>2)] = screen.width;
      HEAP32[(((eventStruct)+(272))>>2)] = screen.height;
      if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement;
      }
    };
  
  
  
  var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc(276);
  
      var fullscreenChangeEventhandlerFunc = (e = event) => {
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
  
        fillFullscreenChangeEventData(fullscreenChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  var _emscripten_set_fullscreenchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
  
      return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
    };

  
  
  
  
  var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc(1240);
  
      var gamepadEventHandlerFunc = (e = event) => {
        var gamepadEvent = JSEvents.gamepadEvent;
        fillGamepadEventData(gamepadEvent, e["gamepad"]);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
    };

  
  var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
    };

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"]
        ;
  
      HEAP32[idx + 9] = e["movementY"]
        ;
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
  
    };
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.pointerlockChangeEvent) JSEvents.pointerlockChangeEvent = _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.touchEvent) JSEvents.touchEvent = _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

  
  var fillVisibilityChangeEventData = (eventStruct) => {
      var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
      var visibilityState = visibilityStates.indexOf(document.visibilityState);
  
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = document.hidden;
      HEAP32[(((eventStruct)+(4))>>2)] = visibilityState;
    };
  
  
  
  var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.visibilityChangeEvent) JSEvents.visibilityChangeEvent = _malloc(8);
  
      var visibilityChangeEventHandlerFunc = (e = event) => {
        var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
  
        fillVisibilityChangeEventData(visibilityChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
    if (!specialHTMLTargets[1]) {
      return -4;
    }
      return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
    };

  
  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  
  var _emscripten_set_window_title = (title) => document.title = UTF8ToString(title);

  var _emscripten_sleep = () => {
      throw 'Please compile your program with async support in order to use asynchronous operations like emscripten_sleep';
    };

  var ENV = {
  };
  
  var getExecutableName = () => {
      return thisProgram || './this.program';
    };
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };

  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }





  var listenOnce = (object, event, func) => {
      object.addEventListener(event, func, { 'once': true });
    };
  /** @param {Object=} elements */
  var autoResumeAudioContext = (ctx, elements) => {
      if (!elements) {
        elements = [document, document.getElementById('canvas')];
      }
      ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
        elements.forEach((element) => {
          if (element) {
            listenOnce(element, event, () => {
              if (ctx.state === 'suspended') ctx.resume();
            });
          }
        });
      });
    };

  var dynCallLegacy = (sig, ptr, args) => {
      sig = sig.replace(/p/g, 'i')
      assert(('dynCall_' + sig) in Module, `bad function pointer type - dynCall function not found for sig '${sig}'`);
      if (args?.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module['dynCall_' + sig];
      return f(ptr, ...args);
    };
  
  
  var dynCall = (sig, ptr, args = []) => {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of their signature, so we rely on the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
      var rtn = getWasmTableEntry(ptr)(...args);
      return rtn;
    };




  var FS_createPath = FS.createPath;



  var FS_unlink = (path) => FS.unlink(path);

  var FS_createLazyFile = FS.createLazyFile;

  var FS_createDevice = FS.createDevice;

  var incrementExceptionRefcount = (ptr) => ___cxa_increment_exception_refcount(ptr);
  Module['incrementExceptionRefcount'] = incrementExceptionRefcount;

  var decrementExceptionRefcount = (ptr) => ___cxa_decrement_exception_refcount(ptr);
  Module['decrementExceptionRefcount'] = decrementExceptionRefcount;

  
  
  
  
  
  var getExceptionMessageCommon = (ptr) => {
      var sp = stackSave();
      var type_addr_addr = stackAlloc(4);
      var message_addr_addr = stackAlloc(4);
      ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
      var type_addr = HEAPU32[((type_addr_addr)>>2)];
      var message_addr = HEAPU32[((message_addr_addr)>>2)];
      var type = UTF8ToString(type_addr);
      _free(type_addr);
      var message;
      if (message_addr) {
        message = UTF8ToString(message_addr);
        _free(message_addr);
      }
      stackRestore(sp);
      return [type, message];
    };
  var getExceptionMessage = (ptr) => getExceptionMessageCommon(ptr);
  Module['getExceptionMessage'] = getExceptionMessage;

      // exports
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["requestFullScreen"] = Browser.requestFullScreen;
      Module["requestAnimationFrame"] = Browser.requestAnimationFrame;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["pauseMainLoop"] = Browser.mainLoop.pause;
      Module["resumeMainLoop"] = Browser.mainLoop.resume;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      var preloadedImages = {};
      var preloadedAudios = {};;

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();
  // Set module methods based on EXPORTED_RUNTIME_METHODS
  Module["FS_createPath"] = FS.createPath;
  Module["FS_createDataFile"] = FS.createDataFile;
  Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
  Module["FS_unlink"] = FS.unlink;
  Module["FS_createLazyFile"] = FS.createLazyFile;
  Module["FS_createDevice"] = FS.createDevice;
  ;
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
  };
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
  };
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __cxa_begin_catch: ___cxa_begin_catch,
  /** @export */
  __cxa_end_catch: ___cxa_end_catch,
  /** @export */
  __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
  /** @export */
  __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
  /** @export */
  __cxa_rethrow: ___cxa_rethrow,
  /** @export */
  __cxa_throw: ___cxa_throw,
  /** @export */
  __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
  /** @export */
  __resumeException: ___resumeException,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_getdents64: ___syscall_getdents64,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  _emscripten_throw_longjmp: __emscripten_throw_longjmp,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  eglBindAPI: _eglBindAPI,
  /** @export */
  eglChooseConfig: _eglChooseConfig,
  /** @export */
  eglCreateContext: _eglCreateContext,
  /** @export */
  eglCreateWindowSurface: _eglCreateWindowSurface,
  /** @export */
  eglDestroyContext: _eglDestroyContext,
  /** @export */
  eglDestroySurface: _eglDestroySurface,
  /** @export */
  eglGetConfigAttrib: _eglGetConfigAttrib,
  /** @export */
  eglGetDisplay: _eglGetDisplay,
  /** @export */
  eglGetError: _eglGetError,
  /** @export */
  eglInitialize: _eglInitialize,
  /** @export */
  eglMakeCurrent: _eglMakeCurrent,
  /** @export */
  eglQueryString: _eglQueryString,
  /** @export */
  eglSwapBuffers: _eglSwapBuffers,
  /** @export */
  eglSwapInterval: _eglSwapInterval,
  /** @export */
  eglTerminate: _eglTerminate,
  /** @export */
  eglWaitGL: _eglWaitGL,
  /** @export */
  eglWaitNative: _eglWaitNative,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
  /** @export */
  emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_enter_soft_fullscreen: _emscripten_enter_soft_fullscreen,
  /** @export */
  emscripten_err: _emscripten_err,
  /** @export */
  emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
  /** @export */
  emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
  /** @export */
  emscripten_force_exit: _emscripten_force_exit,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
  /** @export */
  emscripten_get_heap_max: _emscripten_get_heap_max,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
  /** @export */
  emscripten_get_preloaded_image_data: _emscripten_get_preloaded_image_data,
  /** @export */
  emscripten_get_preloaded_image_data_from_FILE: _emscripten_get_preloaded_image_data_from_FILE,
  /** @export */
  emscripten_get_screen_size: _emscripten_get_screen_size,
  /** @export */
  emscripten_glActiveTexture: _emscripten_glActiveTexture,
  /** @export */
  emscripten_glAttachShader: _emscripten_glAttachShader,
  /** @export */
  emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
  /** @export */
  emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
  /** @export */
  emscripten_glBindBuffer: _emscripten_glBindBuffer,
  /** @export */
  emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
  /** @export */
  emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
  /** @export */
  emscripten_glBindTexture: _emscripten_glBindTexture,
  /** @export */
  emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
  /** @export */
  emscripten_glBlendColor: _emscripten_glBlendColor,
  /** @export */
  emscripten_glBlendEquation: _emscripten_glBlendEquation,
  /** @export */
  emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
  /** @export */
  emscripten_glBlendFunc: _emscripten_glBlendFunc,
  /** @export */
  emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
  /** @export */
  emscripten_glBufferData: _emscripten_glBufferData,
  /** @export */
  emscripten_glBufferSubData: _emscripten_glBufferSubData,
  /** @export */
  emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
  /** @export */
  emscripten_glClear: _emscripten_glClear,
  /** @export */
  emscripten_glClearColor: _emscripten_glClearColor,
  /** @export */
  emscripten_glClearDepthf: _emscripten_glClearDepthf,
  /** @export */
  emscripten_glClearStencil: _emscripten_glClearStencil,
  /** @export */
  emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
  /** @export */
  emscripten_glColorMask: _emscripten_glColorMask,
  /** @export */
  emscripten_glCompileShader: _emscripten_glCompileShader,
  /** @export */
  emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
  /** @export */
  emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
  /** @export */
  emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
  /** @export */
  emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
  /** @export */
  emscripten_glCreateProgram: _emscripten_glCreateProgram,
  /** @export */
  emscripten_glCreateShader: _emscripten_glCreateShader,
  /** @export */
  emscripten_glCullFace: _emscripten_glCullFace,
  /** @export */
  emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
  /** @export */
  emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
  /** @export */
  emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
  /** @export */
  emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
  /** @export */
  emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
  /** @export */
  emscripten_glDeleteShader: _emscripten_glDeleteShader,
  /** @export */
  emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
  /** @export */
  emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
  /** @export */
  emscripten_glDepthFunc: _emscripten_glDepthFunc,
  /** @export */
  emscripten_glDepthMask: _emscripten_glDepthMask,
  /** @export */
  emscripten_glDepthRangef: _emscripten_glDepthRangef,
  /** @export */
  emscripten_glDetachShader: _emscripten_glDetachShader,
  /** @export */
  emscripten_glDisable: _emscripten_glDisable,
  /** @export */
  emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
  /** @export */
  emscripten_glDrawArrays: _emscripten_glDrawArrays,
  /** @export */
  emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
  /** @export */
  emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
  /** @export */
  emscripten_glDrawElements: _emscripten_glDrawElements,
  /** @export */
  emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
  /** @export */
  emscripten_glEnable: _emscripten_glEnable,
  /** @export */
  emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
  /** @export */
  emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
  /** @export */
  emscripten_glFinish: _emscripten_glFinish,
  /** @export */
  emscripten_glFlush: _emscripten_glFlush,
  /** @export */
  emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
  /** @export */
  emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
  /** @export */
  emscripten_glFrontFace: _emscripten_glFrontFace,
  /** @export */
  emscripten_glGenBuffers: _emscripten_glGenBuffers,
  /** @export */
  emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
  /** @export */
  emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
  /** @export */
  emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
  /** @export */
  emscripten_glGenTextures: _emscripten_glGenTextures,
  /** @export */
  emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
  /** @export */
  emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
  /** @export */
  emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
  /** @export */
  emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
  /** @export */
  emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
  /** @export */
  emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
  /** @export */
  emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
  /** @export */
  emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
  /** @export */
  emscripten_glGetError: _emscripten_glGetError,
  /** @export */
  emscripten_glGetFloatv: _emscripten_glGetFloatv,
  /** @export */
  emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
  /** @export */
  emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
  /** @export */
  emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
  /** @export */
  emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
  /** @export */
  emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
  /** @export */
  emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
  /** @export */
  emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
  /** @export */
  emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
  /** @export */
  emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
  /** @export */
  emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
  /** @export */
  emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
  /** @export */
  emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
  /** @export */
  emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
  /** @export */
  emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
  /** @export */
  emscripten_glGetString: _emscripten_glGetString,
  /** @export */
  emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
  /** @export */
  emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
  /** @export */
  emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
  /** @export */
  emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
  /** @export */
  emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
  /** @export */
  emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
  /** @export */
  emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
  /** @export */
  emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
  /** @export */
  emscripten_glHint: _emscripten_glHint,
  /** @export */
  emscripten_glIsBuffer: _emscripten_glIsBuffer,
  /** @export */
  emscripten_glIsEnabled: _emscripten_glIsEnabled,
  /** @export */
  emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
  /** @export */
  emscripten_glIsProgram: _emscripten_glIsProgram,
  /** @export */
  emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
  /** @export */
  emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
  /** @export */
  emscripten_glIsShader: _emscripten_glIsShader,
  /** @export */
  emscripten_glIsTexture: _emscripten_glIsTexture,
  /** @export */
  emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
  /** @export */
  emscripten_glLineWidth: _emscripten_glLineWidth,
  /** @export */
  emscripten_glLinkProgram: _emscripten_glLinkProgram,
  /** @export */
  emscripten_glPixelStorei: _emscripten_glPixelStorei,
  /** @export */
  emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
  /** @export */
  emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
  /** @export */
  emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
  /** @export */
  emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
  /** @export */
  emscripten_glReadPixels: _emscripten_glReadPixels,
  /** @export */
  emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
  /** @export */
  emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
  /** @export */
  emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
  /** @export */
  emscripten_glScissor: _emscripten_glScissor,
  /** @export */
  emscripten_glShaderBinary: _emscripten_glShaderBinary,
  /** @export */
  emscripten_glShaderSource: _emscripten_glShaderSource,
  /** @export */
  emscripten_glStencilFunc: _emscripten_glStencilFunc,
  /** @export */
  emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
  /** @export */
  emscripten_glStencilMask: _emscripten_glStencilMask,
  /** @export */
  emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
  /** @export */
  emscripten_glStencilOp: _emscripten_glStencilOp,
  /** @export */
  emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
  /** @export */
  emscripten_glTexImage2D: _emscripten_glTexImage2D,
  /** @export */
  emscripten_glTexParameterf: _emscripten_glTexParameterf,
  /** @export */
  emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
  /** @export */
  emscripten_glTexParameteri: _emscripten_glTexParameteri,
  /** @export */
  emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
  /** @export */
  emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
  /** @export */
  emscripten_glUniform1f: _emscripten_glUniform1f,
  /** @export */
  emscripten_glUniform1fv: _emscripten_glUniform1fv,
  /** @export */
  emscripten_glUniform1i: _emscripten_glUniform1i,
  /** @export */
  emscripten_glUniform1iv: _emscripten_glUniform1iv,
  /** @export */
  emscripten_glUniform2f: _emscripten_glUniform2f,
  /** @export */
  emscripten_glUniform2fv: _emscripten_glUniform2fv,
  /** @export */
  emscripten_glUniform2i: _emscripten_glUniform2i,
  /** @export */
  emscripten_glUniform2iv: _emscripten_glUniform2iv,
  /** @export */
  emscripten_glUniform3f: _emscripten_glUniform3f,
  /** @export */
  emscripten_glUniform3fv: _emscripten_glUniform3fv,
  /** @export */
  emscripten_glUniform3i: _emscripten_glUniform3i,
  /** @export */
  emscripten_glUniform3iv: _emscripten_glUniform3iv,
  /** @export */
  emscripten_glUniform4f: _emscripten_glUniform4f,
  /** @export */
  emscripten_glUniform4fv: _emscripten_glUniform4fv,
  /** @export */
  emscripten_glUniform4i: _emscripten_glUniform4i,
  /** @export */
  emscripten_glUniform4iv: _emscripten_glUniform4iv,
  /** @export */
  emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
  /** @export */
  emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
  /** @export */
  emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
  /** @export */
  emscripten_glUseProgram: _emscripten_glUseProgram,
  /** @export */
  emscripten_glValidateProgram: _emscripten_glValidateProgram,
  /** @export */
  emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
  /** @export */
  emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
  /** @export */
  emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
  /** @export */
  emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
  /** @export */
  emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
  /** @export */
  emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
  /** @export */
  emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
  /** @export */
  emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
  /** @export */
  emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
  /** @export */
  emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
  /** @export */
  emscripten_glViewport: _emscripten_glViewport,
  /** @export */
  emscripten_has_asyncify: _emscripten_has_asyncify,
  /** @export */
  emscripten_request_animation_frame_loop: _emscripten_request_animation_frame_loop,
  /** @export */
  emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
  /** @export */
  emscripten_request_pointerlock: _emscripten_request_pointerlock,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
  /** @export */
  emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_element_css_size: _emscripten_set_element_css_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
  /** @export */
  emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
  /** @export */
  emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_set_window_title: _emscripten_set_window_title,
  /** @export */
  emscripten_sleep: _emscripten_sleep,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  invoke_diii,
  /** @export */
  invoke_fiii,
  /** @export */
  invoke_i,
  /** @export */
  invoke_ii,
  /** @export */
  invoke_iii,
  /** @export */
  invoke_iiii,
  /** @export */
  invoke_iiiii,
  /** @export */
  invoke_iiiiid,
  /** @export */
  invoke_iiiiii,
  /** @export */
  invoke_iiiiiii,
  /** @export */
  invoke_iiiiiiii,
  /** @export */
  invoke_iiiiiiiiiii,
  /** @export */
  invoke_iiiiiiiiiiii,
  /** @export */
  invoke_iiiiiiiiiiiii,
  /** @export */
  invoke_jiiii,
  /** @export */
  invoke_v,
  /** @export */
  invoke_vi,
  /** @export */
  invoke_vii,
  /** @export */
  invoke_viii,
  /** @export */
  invoke_viiii,
  /** @export */
  invoke_viiiii,
  /** @export */
  invoke_viiiiiii,
  /** @export */
  invoke_viiiiiiiiii,
  /** @export */
  invoke_viiiiiiiiiiiiiii
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var _main = Module['_main'] = createExportWrapper('main', 2);
var _handleGameFileLoaded = Module['_handleGameFileLoaded'] = createExportWrapper('handleGameFileLoaded', 0);
var _malloc = Module['_malloc'] = createExportWrapper('malloc', 1);
var _free = createExportWrapper('free', 1);
var _fflush = createExportWrapper('fflush', 1);
var _fileno = createExportWrapper('fileno', 1);
var _strerror = createExportWrapper('strerror', 1);
var _emscripten_builtin_memalign = createExportWrapper('emscripten_builtin_memalign', 2);
var _setThrew = createExportWrapper('setThrew', 2);
var __emscripten_tempret_set = createExportWrapper('_emscripten_tempret_set', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var ___cxa_free_exception = createExportWrapper('__cxa_free_exception', 1);
var ___cxa_decrement_exception_refcount = createExportWrapper('__cxa_decrement_exception_refcount', 1);
var ___cxa_increment_exception_refcount = createExportWrapper('__cxa_increment_exception_refcount', 1);
var ___get_exception_message = createExportWrapper('__get_exception_message', 3);
var ___cxa_can_catch = createExportWrapper('__cxa_can_catch', 3);
var ___cxa_get_exception_ptr = createExportWrapper('__cxa_get_exception_ptr', 1);
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji', 5);
var dynCall_viijii = Module['dynCall_viijii'] = createExportWrapper('dynCall_viijii', 7);
var dynCall_jiiii = Module['dynCall_jiiii'] = createExportWrapper('dynCall_jiiii', 5);
var dynCall_iiiiij = Module['dynCall_iiiiij'] = createExportWrapper('dynCall_iiiiij', 7);
var dynCall_iiiiijj = Module['dynCall_iiiiijj'] = createExportWrapper('dynCall_iiiiijj', 9);
var dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] = createExportWrapper('dynCall_iiiiiijj', 10);
var dynCall_ji = Module['dynCall_ji'] = createExportWrapper('dynCall_ji', 2);
var dynCall_iiji = Module['dynCall_iiji'] = createExportWrapper('dynCall_iiji', 5);

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiid(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return dynCall_jiiii(index,a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
Module['FS_unlink'] = FS_unlink;
Module['FS_createPath'] = FS_createPath;
Module['FS_createDevice'] = FS_createDevice;
Module['FS'] = FS;
Module['FS_createDataFile'] = FS_createDataFile;
Module['FS_createLazyFile'] = FS_createLazyFile;
var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'getTempRet0',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'emscriptenLog',
  'getDynCaller',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'writeArrayToMemory',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'Browser_asyncPrepareDataCounter',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53Checked',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'setTempRet0',
  'ptrToString',
  'zeroMemory',
  'exitJS',
  'getHeapMax',
  'growMemory',
  'ENV',
  'ERRNO_CODES',
  'strError',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'readEmAsmArgs',
  'runEmAsmFunction',
  'runMainThreadEmAsm',
  'jstoi_q',
  'jstoi_s',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'dynCall',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'stringToAscii',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'UNWIND_CACHE',
  'ExitStatus',
  'getEnvStrings',
  'doReadv',
  'doWritev',
  'safeSetTimeout',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'findMatchingCatch',
  'getExceptionMessageCommon',
  'incrementExceptionRefcount',
  'decrementExceptionRefcount',
  'getExceptionMessage',
  'Browser',
  'setMainLoop',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS_readFile',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
  'IDBFS',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain() {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  var argc = 0;
  var argv = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach((name) => {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

