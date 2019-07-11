const lotto = {
  btn: document.getElementById('js-create-number'),
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
  printDate() {
    const date = this.getPublishDate();
    const target = document.querySelector('.publish_date');

    if (!target.classList.contains('on')) {
      target.classList.add('on');
    }
    target.innerHTML = `발행일 : ${date}`;
  },
  printNumber() {
    const nums = this.createNumber();
    const target = document.querySelector('.number_list');
    const target2 = document.querySelector('.game_item');
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
  init() {
    const btn = this.btn;

    btn.addEventListener('click', () => {
      this.printNumber();
      this.printDate();
    });
  }
}

lotto.init();