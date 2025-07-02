const series = [
      {
        id: 94605,
        title: "Arcane",
        overview: "Las tensiones entre Piltover y Zaun aumentan con esta historia que sigue a dos hermanas y su destino en mundos enfrentados.",
        poster_path: "/zMHKvQb6e7E8Dq5ueZv1guX4n0K.jpg"
      },
      {
        id: 2,
        title: "Adults",
        overview: "Un grupo de veinteañeros en Nueva York intenta ser buenas personas, a pesar de no ser 'buenos' ni 'personas' aún.",
        poster_path: ""
      }
    ];

    const container = document.getElementById("recommendations");

    function loadViewed() {
      const viewed = localStorage.getItem("viewedSeries");
      return viewed ? JSON.parse(viewed) : [];
    }

    function saveViewed(viewed) {
      localStorage.setItem("viewedSeries", JSON.stringify(viewed));
    }

    function render() {
      const viewed = loadViewed();
      container.innerHTML = "";
      series.forEach(s => {
        const card = document.createElement("div");
        card.className = "card";
        if (viewed.includes(s.id)) card.classList.add("viewed");

        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w300${s.poster_path}" alt="${s.title} poster" />
          <div>
            <h2>${s.title}</h2>
            <p>${s.overview}</p>
            <button>${viewed.includes(s.id) ? "Vista ✔️" : "Marcar como vista"}</button>
          </div>
        `;

        const btn = card.querySelector("button");
        btn.onclick = function() {
          let viewedNow = loadViewed();
          if (!viewedNow.includes(s.id)) {
            viewedNow.push(s.id);
            saveViewed(viewedNow);
          } else {
            // si querés, acá podemos permitir "desmarcar" vista
            viewedNow = viewedNow.filter(id => id !== s.id);
            saveViewed(viewedNow);
          }
          render();
        };

        container.appendChild(card);
      });
    }

    render();