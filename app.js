// first, get Canvas form html
const canvas = document.getElementById("jsCanvas");

/* Canvas : html element로 context를 갖는다.
   context란 이 요소 안에서 픽셀에 접근할 수 있는 방법이다.
   아래 코드는 캔버스 픽셀을 2d로 접근할 수 있게 해주는 것이다. */
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
// pixel modifier에 값을 주지 않으면 캔버스 안에 선이 안그려짐. 캔버스 크기 적어줘야함
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// context의 디폴트값
ctx.fillStyle = "white"; //이미지 저장시 배경이 투명으로 저장되는 걸 방지
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; // strokeStyle: 색상이나 스타일을 라인에 사용할 수 있다.
ctx.fillStyle = INITIAL_COLOR; // 사각형을 렌더링함
ctx.lineWidth = 2.5;

let painting = false; // default값으로 false 설정. "그리지 않고 있음"
let filling = false; // 채우기값 디폴트 설정

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}


// Canvas Event
function onMouseMove(event) { // 마우스 움직임 감지
    const x = event.offsetX; // 다른 값들은 필요없고 offset(캔버스의 좌표값)만 구하면 된다.
    const y = event.offsetY;
    if(!painting) { // 그리는 중이 아니라면(마우스 클릭 X) 좌표를 구해 길을 구하기만 함. 선을 그리진 않음
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { // 그리는 중이라면 라인을 나타내서 그리기 시작함.
        ctx.lineTo(x, y);
        ctx.stroke(); //선을 그리는 코드
        }
    }

function handleColorClick(event) { // 팔레트색깔 클릭 시
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 색 변경
    ctx.fillStyle = color;
}

function handleRangeChange(event) { // 브러쉬 크기(input)
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() { // Fill에서 Paint로 모드 변경
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault(); //마우스 우클릭 방지
}

function handleSaveClick() { // save버튼을 누르면 자동으로 저장되도록
    const image = canvas.toDataURL(); // canvas 데이터를 image로 얻는 것
    const link = document.createElement("a"); //존재하지 않는 링크를 만든다.
    link.href = image; // 이미지는 링크를 갖고 있다
    link.download = "🖍";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting); 
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    //stopPainting을 설정했으니, mouseleave는 따로 함수가 필요없다.
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange)
};

if(mode) {
    mode.addEventListener("click", handleModeClick)
};

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}