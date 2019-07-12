const lotto = {
  btn: document.getElementById('js-create-number'),
  multiBtn: document.getElementById('js-multi-number'),
  createNumberRange() {
    const min = 1, max = 45;
    let nums = [];

    for (let i = min; i <= max; i++) {
      nums.push(i);
    }

    return nums;
  },
  createNumber() {
    const numberRange = this.createNumberRange();
    let nums = [];

    function setRandomIndex(num, max) {
      let number = Math.floor(Math.random() * max) + 1;
      return num === number ? setRandomIndex() : number;
    }

    numberRange.forEach((item, index, arr) => {
      let randomNum = setRandomIndex();

      if (index > 5) {
        return false;
      } 
      if (!arr[randomNum]) {
        let prevNum = randomNum;
        randomNum = setRandomIndex(prevNum, arr.length - 1);
        nums.push(...arr.splice(randomNum, 1));
      } else {
        nums.push(...arr.splice(randomNum, 1));
      }
    });
    nums.sort((a, b) => a - b );

    return nums;
  },
  getPublishDate() {
    const date = new Date();
    
    function getFormatDate(date) {
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let day2 = week[date.getDay()];
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      return `${[year, month, day].join('/')} (${day2}) ${[hours, minutes, seconds].join(':')}`;
    }

    return getFormatDate(date);
  },
  printDate(name) {
    const date = this.getPublishDate();
    const target = document.querySelector(name);

    if (!target.classList.contains('on')) {
      target.classList.add('on');
    }
    target.innerHTML = `발행일 : ${date}`;
  },
  printNumber() {
    const nums = this.createNumber();
    const target = document.querySelector('.number_list');
    const target2 = document.querySelector('.js-only-paper .game_item');
    const printTarget = [...target.children];
    const paperTarget = [...target2.children];
    

    target.classList.add('play');
    document.querySelector('.js-only-paper').classList.add('play');
    
    setTimeout(() => {
      target.classList.remove('play');
      document.querySelector('.js-only-paper').classList.remove('play');
    },1000);
    
    printTarget.forEach((item, index) => {item.innerHTML = nums[index]});
    for (let i = 2; i < paperTarget.length; i++) {
      paperTarget[i].innerHTML = nums[i - 2];
    }
  },
  printMultiNumber() {
    const target = document.querySelector('.js-multi-paper .paper_body');
    const paperTarget = [...target.children];
    let nums = [];
    for (let i = 0; i < 5; i++) {
      nums.push(this.createNumber());
    }
    
    document.querySelector('.js-multi-paper').classList.add('play');
    setTimeout(() => {
      document.querySelector('.js-multi-paper').classList.remove('play');
    },1000);

    paperTarget.forEach((item, index, arr) => {
      let printTarget = [...item.children]

      for (let j = 2; j < printTarget.length; j++) {
        printTarget[j].innerHTML = nums[index][j - 2];
      }
    });
  },
  init() {
    const btn = this.btn;
    const multiBtn = this.multiBtn;

    btn.addEventListener('click', () => {
      this.printNumber();
      this.printDate('.publish_date');
    });
    multiBtn.addEventListener('click', () => {
      this.printMultiNumber();
      this.printDate('.publish_date2');
    });
  }
};

const lottoSlide = () => {
  const slideItem = [...document.querySelectorAll('.slide_item')]
  const nextBtn = document.getElementById('js-slide-next');
  const prevBtn = document.getElementById('js-slide-prev');

  nextBtn.addEventListener('click', slideChange);
  prevBtn.addEventListener('click', slideChange);
  
  function slideChange() {
    let id = this.getAttribute('id').split('-')[2];
    let currentSlide;
    slideItem.forEach(item => {
      if (item.classList.contains('active')) {
        currentSlide = item;
      }
    });
    let currentIndex = slideItem.indexOf(currentSlide);

    slideItem.forEach(item => item.classList.remove('active'));
    if (id === 'next') {
      slideItem[currentIndex + 1].classList.add('active');
      this.classList.add('hide');
      prevBtn.classList.remove('hide');
    } else if (id === 'prev') {
      slideItem[currentIndex - 1].classList.add('active');
      this.classList.add('hide');
      nextBtn.classList.remove('hide');
    }
  }
};

lotto.init();
lottoSlide();