export const initializeJquery = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/vendor/jquery-3.6.0.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

export const initializeJqueryMigrate = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/vendor/jquery-migrate-3.3.2.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

export const initializeBootstrap = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/bootstrap.bundle.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

export const initializeMeanMenu = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/jquery.meanmenu.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  export const initializeSlick = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/slick.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  export const initializeTreeview = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/jquery.treeview.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  export const initializeLightBox = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/lightbox.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  
  export const initializeJqueryUI = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/jquery-ui.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  export const initializeNivoSlider = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/lib/js/jquery.nivo.slider.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  export const initializeHome = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/lib/home.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  export const initializeNiceScroll = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/jquery.nicescroll.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  export const initializeCountDown = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/countdon.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  

  export const initializeWOW = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/wow.min.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  export const initializePlugin = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/plugins.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  export const initializeMain = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://woodsleaf-2j8u.vercel.app/js/main.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
