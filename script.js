// 初始化随机背景图和诗句
let currentPoemIndex = 0;
const poems = [];
let isDarkMode = false;
const modeToggle = document.getElementById('mode-toggle');
const shareIcon = document.getElementById('share-icon');

// 从 JSON 文件中加载诗句
fetch('poems.json')
    .then(response => response.json())
    .then(data => {
        poems.push(...data);
        displayRandomPoem();
        changeRandomBackground();
    });

// 切换诗句
document.getElementById('change-poem').addEventListener('click', () => {
    displayRandomPoem();
    changeRandomBackground();
});

// 切换背景图
function changeRandomBackground() {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    document.body.style.backgroundImage = `url('bg/${randomNum}.webp')`;
}

// 显示随机诗句
function displayRandomPoem() {
    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];
    document.getElementById('poem').textContent = poem.text;
    document.getElementById('author-title').textContent = `—— ${poem.author}  ${poem.title}`;
}

// 切换暗色/亮色模式
modeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    modeToggle.textContent = isDarkMode ? '🌑' : '☀️';
});

// 显示分享区域
shareIcon.addEventListener('click', () => {
    document.getElementById('share-section').style.display = 'block';
});

// 生成截图
document.getElementById('generate-screenshot').addEventListener('click', () => {
    const fromName = document.getElementById('from-name').value;
    const toName = document.getElementById('to-name').value;
    const headerText = fromName ? `${fromName} 致 ${toName}：` : `致${toName}`;

    const poemContainer = document.getElementById('poem-container');
    const originalTitle = document.querySelector('header h1');
    const originalButton = document.getElementById('change-poem');
    const icons = document.querySelector('.header-icons');
    const shareSection = document.getElementById('share-section'); // 获取分享部分

    // 隐藏不需要的部分
    originalTitle.style.display = 'none';
    originalButton.style.display = 'none';
    icons.style.display = 'none'; // 隐藏图标
    shareSection.style.display = 'none'; // 隐藏分享部分
    
    const header = document.createElement('p');
    header.textContent = headerText;
    header.style.position = 'absolute';
    header.style.top = '10px';
    header.style.left = '10px';
    header.style.color = 'black';
    header.style.fontSize = '24px'; // 增大字号
    document.body.appendChild(header);

    const footer = document.createElement('p');
    footer.textContent = '中秋一言 - https://mid-autumn.brume.top/ ';
    footer.style.position = 'absolute';
    footer.style.bottom = '10px';
    footer.style.right = '10px';
    footer.style.color = 'black';
    footer.style.background = '#D8D1C5';
    document.body.appendChild(footer);

    html2canvas(document.body).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'screenshot.png';
        link.click();
        
        // 恢复标题和按钮显示
        header.remove();
        footer.remove();
        originalTitle.style.display = 'block';
        originalButton.style.display = 'block';
        icons.style.display = 'flex'; // 恢复图标
        shareSection.style.display = 'block'; // 恢复分享部分
    });
});