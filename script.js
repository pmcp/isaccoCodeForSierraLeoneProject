const audio = [
        {
          section: 'intro',
          url:
            'https://ucarecdn.com/e5a24f09-9a02-489e-b642-80909057f114/01_intro.mp3',
        },
        {
          section: 'sundu',
          url:
            'https://ucarecdn.com/b7904bea-d724-4e4a-b5ce-3e0a3875272f/02_sundu.mp3',
        },
        {
          section: 'faso',
          url:
            'https://ucarecdn.com/1004a11b-a1c1-4bfc-9d30-9ed89d7fe250/04_Faso.mp3',
        },
        {
          section: 'mosquito',
          url:
            'https://ucarecdn.com/44ecab4f-5649-496d-a05a-72bfdfb67d6b/03_Mosquito.mp3',
        },
        {
          section: 'mariama',
          url:
            'https://ucarecdn.com/eba4b81b-0fb2-4233-8b0f-5f585dccfa98/05_mariama.mp3',
        },
        {
          section: 'aminata',
          url:
            'https://ucarecdn.com/23784165-6f33-49c3-a177-5881a9e65e82/06_York.mp3',
        },
        {
          section: 'nasiru',
          url:
            'https://ucarecdn.com/84ffbc0d-848f-4bc1-b040-fa922c8d6be7/07_Nasiru.mp3',
        },
        {
          section: 'kayakor',
          url:
            'https://ucarecdn.com/6bf5edd0-3a84-4093-a023-b37e8d2b2a21/08_Kayakor.mp3',
        },
        {
          section: 'ambulance',
          url:
            'https://ucarecdn.com/5199480c-38fd-425a-81c8-f7228c16b0ae/ambulance.mp3',
        },
      ];

      // dom elements we will need
      const localStorage = window.localStorage;
      const soundToggle = document.getElementById('soundToggle');
      const audioToggle = document.getElementById('activateAudio');
      const videoLightBoxes = document.getElementsByClassName('lightbox-link');
      const warningButton = document.getElementById('warningButton');
      const warningMessage = document.getElementById('warningMessage');
      const warningAccepted = localStorage.getItem('warningAccepted');
      // Create an audio player, prepare it with the intro sound, set to loop
      const audioPlayer = new Audio(
        'https://ucarecdn.com/e5a24f09-9a02-489e-b642-80909057f114/01_intro.mp3'
      );
      audioPlayer.loop = true;
      audioPlayer.volume = 0.5;

      // To check if audio can play
      let audioCanPlay = false;

      function togglePlayer() {
        if (audioPlayer.paused) return audioPlayer.play();
        audioPlayer.pause();
      }

      function play(url) {
        if (!audioCanPlay) return;
        // we change the element's src attribute
        audioPlayer.setAttribute('src', url);
        audioPlayer.play();
      }

      function onEntry(entry) {
        entry.forEach((change) => {
          if (change.isIntersecting) {
            // Start playing audio
            const urlToPlay = audio.filter(
              (a) => a.section == change.target.id
            );
            play(urlToPlay[0].url);
          }
        });
      }

      // list of options
      let options = {
        threshold: [0.5],
      };

      // instantiate a new Intersection Observer
      let observer = new IntersectionObserver(onEntry, options);

      function checkAllChapters() {
        for (let au of audio) {
          let el = document.getElementById(au.section);
          observer.observe(el);
        }
      }

      function activateAudio() {
        audioCanPlay = true;
      }

      function toggleAudio() {
        audioCanPlay = !audioCanPlay;
        if (!audioCanPlay) return audioPlayer.pause();
        togglePlayer();
      }

      function lightboxOpens() {
        audioPlayer.pause();
      }

      for (let vlb of videoLightBoxes) {
        vlb.addEventListener('click', lightboxOpens); // associate the function above with the click event
      }

      function closeWarning() {
        localStorage.setItem('warningAccepted', true);
      }

      audioToggle.addEventListener('click', activateAudio);
      soundToggle.addEventListener('click', toggleAudio);
      warningButton.addEventListener('click', closeWarning);

      // if warning accepted is in localstorage, don't show warning
      function removeWarning() {
        if (!warningAccepted) return;
        warningMessage.style.display = 'none';
      }

      checkAllChapters();
      removeWarning();
