// ========== 全局变量 ==========
let currentDate = new Date();
let completedTasks = new Set();
let totalPoints = 100;
let streakDays = 0;
let selectedColor = '#6a5acd';

// ========== 激励语库（符合八年级学生） ==========
const motivationPhrases = [
    "今天也是闪闪发光的一天！✨",
    "努力的人最酷，你超棒的！💪",
    "每完成一个任务，就离梦想更近一步！🌟",
    "学习使我快乐，进步让我骄傲！📚",
    "你是自己的超级英雄，加油！🦸‍♀️",
    "今天的努力，明天的实力！🔥",
    "专注当下，未来可期！🌈",
    "小小的坚持，大大的成就！💫",
    "学习是通往未来的门票！🎫",
    "你比昨天更优秀了！🎯",
    "自律给我自由，学习给我力量！⚡",
    "每一步都算数，加油！👣",
    "你是最棒的八年级生！🏆",
    "学习就像打怪升级，越打越强！🎮",
    "今天的汗水，明天的微笑！😊"
];

// ========== 任务数据（基于作息表） ==========
const taskData = {
    // 周一至周五
    weekday: [
        { id: 1, title: "完成校内全部作业", time: "放学~20:00", tag: "作业", tagClass: "tag-other", emoji: "📝" },
        { id: 2, title: "英语专项：背默+语法", time: "20:00-21:10", tag: "英语", tagClass: "tag-english", emoji: "🇬🇧", days: [1, 3, 5] },
        { id: 3, title: "语文专项：背诵+刷题", time: "20:00-21:10", tag: "语文", tagClass: "tag-chinese", emoji: "📖", days: [2, 4] }
    ],
    // 周六
    saturday: [
        { id: 4, title: "起床、补觉、休整用餐", time: "10:00", tag: "休息", tagClass: "tag-free", emoji: "😴" },
        { id: 5, title: "理化空中课堂+随堂练习", time: "10:00-11:00", tag: "理化", tagClass: "tag-physics", emoji: "🔬" },
        { id: 6, title: "线下数学补习", time: "13:00-17:00", tag: "数学", tagClass: "tag-math", emoji: "🧮" },
        { id: 7, title: "周末作业查缺补漏", time: "17:00-20:00", tag: "作业", tagClass: "tag-other", emoji: "📚" },
        { id: 8, title: "自由娱乐时间", time: "20:00之后", tag: "娱乐", tagClass: "tag-free", emoji: "🎮" }
    ],
    // 周日
    sunday: [
        { id: 9, title: "美术兴趣课", time: "09:00-11:30", tag: "美术", tagClass: "tag-other", emoji: "🎨" },
        { id: 10, title: "午餐+午休", time: "11:30-13:30", tag: "休息", tagClass: "tag-free", emoji: "🍱" },
        { id: 11, title: "英语一对一补习", time: "14:00-16:00", tag: "英语", tagClass: "tag-english", emoji: "🇬🇧" },
        { id: 12, title: "语文背默+课外练习", time: "16:30-18:00", tag: "语文", tagClass: "tag-chinese", emoji: "📖" },
        { id: 13, title: "全天学习结束，自由休息", time: "18:00之后", tag: "休息", tagClass: "tag-free", emoji: "✨" }
    ]
};

// ========== 奖励内容 ==========
const rewards = {
    music: {
        title: "🎵 音乐时间！",
        content: `
            <div class="reward-image">🎵</div>
            <p class="reward-text">解锁一首好听的歌！</p>
            <p class="reward-subtext">推荐歌曲：<strong>《星辰大海》</strong></p>
            <p class="reward-subtext">学习累了，听首歌放松一下吧~</p>
            <button class="reward-close-btn" onclick="closeRewardModal()">继续学习</button>
        `,
        points: 5
    },
    joke: {
        title: "😂 笑话时间！",
        content: `
            <div class="reward-image">😂</div>
            <p class="reward-text">给你讲个笑话~</p>
            <p class="reward-subtext"><strong>为什么数学书总是很忧郁？</strong></p>
            <p class="reward-subtext">因为它有太多问题要解决！😄</p>
            <button class="reward-close-btn" onclick="closeRewardModal()">哈哈，继续</button>
        `,
        points: 5
    },
    meme: {
        title: "🤣 表情包来啦！",
        content: `
            <div class="reward-image">🤣</div>
            <p class="reward-text">送你一个超搞笑的表情包！</p>
            <p class="reward-subtext"><strong>"学习时的我 vs 考试时的我"</strong></p>
            <p class="reward-subtext">(╯°□°）╯︵ ┻━┻  vs  ( ͡° ͜ʖ ͡°)</p>
            <button class="reward-close-btn" onclick="closeRewardModal()">太逗了！</button>
        `,
        points: 5
    },
    game: {
        title: "🎮 小游戏时间！",
        content: `
            <div class="reward-image">🎮</div>
            <p class="reward-text">来玩个小游戏放松一下！</p>
            <p class="reward-subtext"><strong>快速反应游戏：</strong></p>
            <p class="reward-subtext">点击下面的按钮，看你能多快！</p>
            <div style="margin: 20px 0;">
                <button id="game-btn" style="padding: 15px 30px; font-size: 18px; background: #ff6b6b; color: white; border: none; border-radius: 10px; cursor: pointer;">点击我！</button>
            </div>
            <p id="game-score" style="font-size: 14px; color: #666;">准备开始...</p>
            <button class="reward-close-btn" onclick="closeRewardModal()">结束游戏</button>
        `,
        points: 10
    }
};

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadFromStorage();
    updateUI();
});

function initApp() {
    // 设置当前日期
    const dateElement = document.getElementById('current-date');
    const dayTypeElement = document.getElementById('day-type');
    
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElement.textContent = currentDate.toLocaleDateString('zh-CN', options);
    
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0) {
        dayTypeElement.textContent = "周日";
        dayTypeElement.style.background = "#e8f4fd";
        dayTypeElement.style.color = "#2196F3";
    } else if (dayOfWeek === 6) {
        dayTypeElement.textContent = "周六";
        dayTypeElement.style.background = "#fff3e0";
        dayTypeElement.style.color = "#FF9800";
    } else {
        dayTypeElement.textContent = "工作日";
    }
    
    // 设置随机激励语
    refreshMotivation();
    
    // 生成任务列表
    generateTasks();
}

// ========== 任务管理 ==========
function generateTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    
    const dayOfWeek = currentDate.getDay();
    let tasks = [];
    
    if (dayOfWeek === 0) { // 周日
        tasks = taskData.sunday;
    } else if (dayOfWeek === 6) { // 周六
        tasks = taskData.saturday;
    } else { // 周一至周五
        tasks = taskData.weekday.filter(task => {
            if (!task.days) return true;
            return task.days.includes(dayOfWeek);
        });
    }
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${completedTasks.has(task.id) ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-info">
                <div class="task-title">${task.emoji} ${task.title}</div>
                <div class="task-time">
                    <i class="far fa-clock"></i> ${task.time}
                    <span class="task-tag ${task.tagClass}">${task.tag}</span>
                </div>
            </div>
            <button class="task-complete-btn" onclick="toggleTask(${task.id}, this)">
                <i class="fas ${completedTasks.has(task.id) ? 'fa-check' : 'fa-plus'}"></i>
            </button>
        `;
        container.appendChild(taskElement);
    });
    
    updateProgress();
}

function toggleTask(taskId, button) {
    const taskItem = button.closest('.task-item');
    
    if (completedTasks.has(taskId)) {
        // 取消完成
        completedTasks.delete(taskId);
        taskItem.classList.remove('completed');
        button.innerHTML = '<i class="fas fa-plus"></i>';
        totalPoints -= 10;
        showToast("任务已取消", "warning");
    } else {
        // 完成任务
        completedTasks.add(taskId);
        taskItem.classList.add('completed');
        taskItem.classList.add('popping');
        button.innerHTML = '<i class="fas fa-check"></i>';
        totalPoints += 10;
        
        // 播放音效
        playSound('complete');
        
        // 显示完成效果
        showCompletionEffect(taskItem);
        
        // 显示激励消息
        const messages = [
            "太棒了！任务完成！🎉",
            "优秀！继续加油！💪",
            "完成任务的感觉真好！✨",
            "你又进步了一点！🌟",
            "学习币+10！💰"
        ];
        showToast(messages[Math.floor(Math.random() * messages.length)]);
        
        // 移除动画类
        setTimeout(() => {
            taskItem.classList.remove('popping');
        }, 500);
    }
    
    // 更新UI
    updateUI();
    saveToStorage();
}

function showCompletionEffect(element) {
    // 创建粒子效果
    const emojis = ['✨', '🌟', '💫', '🎉', '✅', '⭐', '🔥', '💪'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.position = 'fixed';
        particle.style.zIndex = '9999';
        particle.style.fontSize = Math.random() * 20 + 16 + 'px';
        particle.style.opacity = '1';
        
        // 随机方向
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// ========== 进度更新 ==========
function updateProgress() {
    const dayOfWeek = currentDate.getDay();
    let totalTasks = 0;
    
    if (dayOfWeek === 0) {
        totalTasks = taskData.sunday.length;
    } else if (dayOfWeek === 6) {
        totalTasks = taskData.saturday.length;
    } else {
        totalTasks = taskData.weekday.filter(task => {
            if (!task.days) return true;
            return task.days.includes(dayOfWeek);
        }).length;
    }
    
    const completedCount = Array.from(completedTasks).filter(id => {
        // 检查任务是否属于今天
        const allTasks = [...taskData.weekday, ...taskData.saturday, ...taskData.sunday];
        const task = allTasks.find(t => t.id === id);
        if (!task) return false;
        
        if (dayOfWeek === 0) return taskData.sunday.some(t => t.id === id);
        if (dayOfWeek === 6) return taskData.saturday.some(t => t.id === id);
        if (!task.days) return true;
        return task.days.includes(dayOfWeek);
    }).length;
    
    const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
    
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `今日进度: ${Math.round(progress)}%`;
    document.getElementById('completed-count').textContent = completedCount;
}

// ========== 激励语 ==========
function refreshMotivation() {
    const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
    document.getElementById('motivation-text').textContent = motivationPhrases[randomIndex];
}

// ========== 奖励系统 ==========
function claimReward(type) {
    if (totalPoints < rewards[type].points) {
        showToast(`需要${rewards[type].points}学习币，继续努力！`, "warning");
        return;
    }
    
    totalPoints -= rewards[type].points;
    
    // 播放奖励音效
    playSound('reward');
    
    // 显示奖励模态框
    document.getElementById('reward-title').textContent = rewards[type].title;
    document.getElementById('reward-body').innerHTML = rewards[type].content;
    document.getElementById('reward-modal').classList.add('show');
    
    // 如果是游戏奖励，初始化游戏
    if (type === 'game') {
        setTimeout(initGame, 100);
    }
    
    // 更新UI
    updateUI();
    saveToStorage();
}

function initGame() {
    const gameBtn = document.getElementById('game-btn');
    const gameScore = document.getElementById('game-score');
    
    if (!gameBtn || !gameScore) return;
    
    let startTime = null;
    let gameActive = false;
    
    gameBtn.onclick = function() {
        if (!gameActive) {
            // 开始游戏
            gameActive = true;
            startTime = Date.now();
            gameBtn.textContent = "再快点！";
            gameBtn.style.background = "#4ecdc4";
            gameScore.textContent = "计时开始...";
        } else {
            // 结束游戏
            const endTime = Date.now();
            const reactionTime = endTime - startTime;
            
            let message;
            if (reactionTime < 300) {
                message = "闪电侠！反应超快！⚡";
                totalPoints += 20;
            } else if (reactionTime < 500) {
                message = "不错哦，反应很快！👍";
                totalPoints += 10;
            } else if (reactionTime < 800) {
                message = "还可以更快哦~ 💪";
                totalPoints += 5;
            } else {
                message = "放松一下，再来一次？ 😊";
            }
            
            gameScore.textContent = `反应时间: ${reactionTime}ms - ${message}`;
            gameBtn.textContent = "重新开始";
            gameBtn.style.background = "#ff6b6b";
            gameActive = false;
            
            updateUI();
            saveToStorage();
        }
    };
}

// ========== 模态框控制 ==========
function openEditModal() {
    document.getElementById('edit-modal').classList.add('show');
    
    // 加载当前设置
    const planName = localStorage.getItem('planName') || '语涵学习助手';
    const dailyReward = localStorage.getItem('dailyReward') || '50';
    const soundEffect = localStorage.getItem('soundEffect') || 'bell';
    const savedColor = localStorage.getItem('selectedColor') || '#6a5acd';
    
    document.getElementById('plan-name').value = planName;
    document.getElementById('daily-reward').value = dailyReward;
    document.getElementById('sound-effect').value = soundEffect;
    
    // 选中当前颜色
    selectColor(savedColor);
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.remove('show');
}

function closeRewardModal() {
    document.getElementById('reward-modal').classList.remove('show');
}

function selectColor(color) {
    selectedColor = color;
    
    // 更新UI中的颜色选择
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.style.backgroundColor === color) {
            option.classList.add('selected');
        }
    });
}

function savePlanSettings() {
    const planName = document.getElementById('plan-name').value;
    const dailyReward = document.getElementById('daily-reward').value;
    const soundEffect = document.getElementById('sound-effect').value;
    
    // 保存到本地存储
    localStorage.setItem('planName', planName);
    localStorage.setItem('dailyReward', dailyReward);
    localStorage.setItem('soundEffect', soundEffect);
    localStorage.setItem('selectedColor', selectedColor);
    
    // 更新页面标题
    document.title = `${planName} ✨`;
    
    // 更新用户信息
    document.querySelector('.user-details h1').textContent = planName;
    
    // 应用主题颜色
    applyThemeColor();
    
    showToast("设置保存成功！", "success");
    closeEditModal();
}

function applyThemeColor() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', selectedColor);
    
    // 计算衍生颜色
    const r = parseInt(selectedColor.slice(1, 3), 16);
    const g = parseInt(selectedColor.slice(3, 5), 16);
    const b = parseInt(selectedColor.slice(5, 7), 16);
    
    // 生成浅色版本
    const lightColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
    root.style.setProperty('--primary-light', lightColor);
    
    // 生成深色版本
    const darkR = Math.max(0, r - 40);
    const darkG = Math.max(0, g - 40);
    const darkB = Math.max(0, b - 40);
    const darkColor = `rgb(${darkR}, ${darkG}, ${darkB})`;
    root.style.setProperty('--primary-dark', darkColor);
}

// ========== 音效控制 ==========
function playSound(type) {
    const soundEnabled = localStorage.getItem('soundEffect') !== 'none';
    if (!soundEnabled) return;
    
    const audio = document.getElementById(`${type}-sound`);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("音效播放失败:", e));
    }
}

// ========== Toast提示 ==========
function showToast(message, type = "success") {
    // 移除旧的toast
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // 设置样式
    if (type === "warning") {
        toast.style.background = "#ff9800";
    } else if (type === "success") {
        toast.style.background = "#4ecdc4";
    }
    
    document.body.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 2500);
}

// ========== 数据持久化 ==========
function saveToStorage() {
    const data = {
        completedTasks: Array.from(completedTasks),
        totalPoints: totalPoints,
        streakDays: streakDays,
        lastDate: currentDate.toISOString().split('T')[0]
    };
    localStorage.setItem('studyPlanData', JSON.stringify(data));
}

function loadFromStorage() {
    const saved = localStorage.getItem('studyPlanData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            completedTasks = new Set(data.completedTasks || []);
            totalPoints = data.totalPoints || 100;
            streakDays = data.streakDays || 0;
            
            // 检查连续打卡
            const today = currentDate.toISOString().split('T')[0];
            const lastDate = data.lastDate;
            
            if (lastDate === today) {
                // 同一天，保持连续
                streakDays = data.streakDays || 0;
            } else if (lastDate && isYesterday(lastDate, today)) {
                // 昨天有打卡，连续天数+1
                streakDays = (data.streakDays || 0) + 1;
            } else {
                // 中断，重置
                streakDays = 0;
            }
            
            // 加载主题颜色
            const savedColor = localStorage.getItem('selectedColor');
            if (savedColor) {
                selectedColor = savedColor;
                applyThemeColor();
            }
            
        } catch (e) {
            console.log("加载存储数据失败:", e);
        }
    }
}

function isYesterday(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1 + 'T00:00:00');
    const date2 = new Date(dateStr2 + 'T00:00:00');
    const diffTime = date2 - date1;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
}

// ========== UI更新 ==========
function updateUI() {
    document.getElementById('total-points').textContent = totalPoints;
    document.getElementById('streak-days').textContent = streakDays;
    updateProgress();
}

// ========== 导出功能 ==========
function exportPlan() {
    const data = {
        planName: localStorage.getItem('planName') || '语涵学习助手',
        tasks: taskData,
        settings: {
            dailyReward: localStorage.getItem('dailyReward') || '50',
            soundEffect: localStorage.getItem('soundEffect') || 'bell',
            themeColor: localStorage.getItem('selectedColor') || '#6a5acd'
        },
        stats: {
            totalPoints: totalPoints,
            streakDays: streakDays,
            completedToday: completedTasks.size
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `语涵学习计划_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast("计划已导出！", "success");
}

// ========== 调试功能 ==========
function debugReset() {
    if (confirm("确定要重置所有数据吗？")) {
        localStorage.clear();
        completedTasks.clear();
        totalPoints = 100;
        streakDays = 0;
        updateUI();
        generateTasks();
        showToast("数据已重置", "warning");
    }
}

// 添加调试按钮（开发时使用）
// document.addEventListener('DOMContentLoaded', function() {
//     const debugBtn = document.createElement('button');
//     debugBtn.textContent = "调试重置";
//     debugBtn.style.position = 'fixed';
//     debugBtn.style.bottom = '10px';
//     debugBtn.style.right = '10px';
//     debugBtn.style.zIndex = '9999';
//     debugBtn.style.padding = '5px 10px';
//     debugBtn.style.background = '#ff6b6b';
//     debugBtn.style.color = 'white';
//     debugBtn.style.border = 'none';
//     debugBtn.style.borderRadius = '5px';
//     debugBtn.style.cursor = 'pointer';
//     debugBtn.onclick = debugReset;
//     document.body.appendChild(debugBtn);
// });