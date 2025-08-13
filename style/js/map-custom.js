// static/js/map-custom.js
(function(){
  // ---------------------------
  // 1) Data: regionInfo keyed by region names
  //    Make sure the keys match the names in mapdata.js.regions[].name
  // ---------------------------
  const regionInfo = {
    "Hokkaido": {
      title: "Hokkaido",
      description: "Japan's great white north — wild winters and lush summers.",
      images: [
        "/static/images/hokkaido1.jpg",
        "/static/images/hokkaido2.jpg",
        "/static/images/hokkaido3.jpg",
        "/static/images/hokkaido4.jpg"
      ]
    },
    "Tohoku": {
      title: "Tohoku",
      description: "A land of mountains, hot springs, and deep traditions.",
      images: [
        "/static/images/tohoku1.jpg",
        "/static/images/tohoku2.jpg",
        "/static/images/tohoku3.jpg",
        "/static/images/tohoku4.jpg"
      ]
    },
    "Hokuriku Shinetsu": {
      title: "Hokuriku Shinetsu",
      description: "Coastal beauty meets alpine adventure.",
      images: [
        "/static/images/hokuriku1.jpg",
        "/static/images/hokuriku2.jpg",
        "/static/images/hokuriku3.jpg",
        "/static/images/hokuriku4.jpg"
      ]
    },
    "Kanto": {
      title: "Kanto",
      description: "The heart of Japan — Tokyo and surrounding prefectures.",
      images: [
        "/static/images/kanto1.jpg",
        "/static/images/kanto2.jpg",
        "/static/images/kanto3.jpg",
        "/static/images/kanto4.jpg"
      ]
    },
    "Tokai": {
      title: "Tokai",
      description: "Home to Mt. Fuji and historic villages.",
      images: [
        "/static/images/tokai1.jpg",
        "/static/images/tokai2.jpg",
        "/static/images/tokai3.jpg",
        "/static/images/tokai4.jpg"
      ]
    },
    "Kansai": {
      title: "Kansai",
      description: "Kyoto's temples, Osaka's food, Nara's charm.",
      images: [
        "/static/images/kansai1.jpg",
        "/static/images/kansai2.jpg",
        "/static/images/kansai3.jpg",
        "/static/images/kansai4.jpg"
      ]
    },
    "Chugoku": {
      title: "Chugoku",
      description: "From Hiroshima's history to Tottori's dunes.",
      images: [
        "/static/images/chugoku1.jpg",
        "/static/images/chugoku2.jpg",
        "/static/images/chugoku3.jpg",
        "/static/images/chugoku4.jpg"
      ]
    },
    "Shikoku": {
      title: "Shikoku",
      description: "The 88-temple pilgrimage and rugged coastlines.",
      images: [
        "/static/images/shikoku1.jpg",
        "/static/images/shikoku2.jpg",
        "/static/images/shikoku3.jpg",
        "/static/images/shikoku4.jpg"
      ]
    },
    "Kyushu": {
      title: "Kyushu",
      description: "Volcanoes, hot springs and rich southern culture.",
      images: [
        "/static/images/kyushu1.jpg",
        "/static/images/kyushu2.jpg",
        "/static/images/kyushu3.jpg",
        "/static/images/kyushu4.jpg"
      ]
    }
  };

  // ---------------------------
  // 2) Build mapping: stateId (JP##) -> regionName (from mapdata.js)
  // ---------------------------
  function buildStateToRegion() {
    const map = {};
    const md = window.simplemaps_countrymap_mapdata;
    if (!md || !md.regions) return map;
    Object.keys(md.regions).forEach(function(regionKey){
      const region = md.regions[regionKey];
      const regionName = region.name; // must match keys in regionInfo
      (region.states || []).forEach(function(stateId){
        map[stateId] = regionName;
      });
    });
    return map;
  }

  // ---------------------------
  // 3) Update panel helper
  // ---------------------------
  function updatePanelByRegionName(regionName){
    if (!regionName) return;
    const info = regionInfo[regionName];
    if (!info) return; // no data for this region

    const titleEl = document.getElementById('region-title');
    const descEl  = document.getElementById('region-description');
    if (titleEl) titleEl.textContent = info.title;
    if (descEl)  descEl.textContent  = info.description;

    const imgs = document.querySelectorAll('.region-images img');
    if (imgs && imgs.length >= 4) {
      for (let i = 0; i < 4; i++) {
        imgs[i].src = info.images[i] || '';
        imgs[i].alt = info.title;
      }
    } else {
      const container = document.querySelector('.region-images');
      if (container) {
        container.innerHTML = '';
        (info.images || []).forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = info.title;
          container.appendChild(img);
        });
      }
    }
  }

  // ---------------------------
  // 4) Attach hooks (safely)
  // ---------------------------
  function attachHooks() {
    const stateToRegion = buildStateToRegion();
    if (!window.simplemaps_countrymap || !window.simplemaps_countrymap.hooks) {
      console.warn('Simplemaps not ready; hooks not found.');
      return;
    }

    simplemaps_countrymap.hooks.state_mouseover = function(id) {
      const regionName = stateToRegion[id];
      // debug log — open developer console to verify mapping
      console.log('map hover:', id, '-> region:', regionName);
      if (regionName) updatePanelByRegionName(regionName);
    };

    // optional: handle mouseout (restore default or keep last)
    simplemaps_countrymap.hooks.state_mouseout = function(id) {
      // keep as-is, or you could clear / show default
      // example: show default text/image set if you want
    };
  }

  // ---------------------------
  // 5) Init (wait for simplemaps to exist)
  // ---------------------------
  function init() {
    if (window.simplemaps_countrymap_mapdata && window.simplemaps_countrymap && window.simplemaps_countrymap.hooks) {
      attachHooks();
    } else {
      window.addEventListener('load', attachHooks);
      // fallback: if map initializes later, you can also retry after a short delay
      setTimeout(function(){ if (!window.simplemaps_countrymap) attachHooks(); }, 800);
    }
  }

  init();

})();
