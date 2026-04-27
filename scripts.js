document.addEventListener('DOMContentLoaded', () => {
  // 1. 온라인 사용자
  const onlineUsers = ['죠나단 죠스타', '죠셉 죠스타', '쿠죠 죠타로', '히가시카타 죠스케', '죠르노 죠바나'];
  const onlineUsersList = document.getElementById('online-users');
  onlineUsers.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `• ${user}`;
    listItem.style.padding = "8px 0";
    onlineUsersList.appendChild(listItem);
  });

  // 2. 사이드바
  const sidebar = document.getElementById('sidebar');
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth - e.clientX < 60) sidebar.classList.add('active');
    else if (window.innerWidth - e.clientX > 300) sidebar.classList.remove('active');
  });

  // 3. 사진 클릭 슬라이드
  const slideTrigger = document.getElementById('slide-trigger');
  const slideshow = document.getElementById('main-slideshow');
  const slides = document.querySelectorAll('.slideshow img');
  let currentIndex = 0;

  slideTrigger?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  // 4. 후기 및 대댓글
  const submitBtn = document.getElementById('submit-btn');
  const postContainer = document.getElementById('post-container');

  submitBtn?.addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    const selectedStar = document.querySelector('input[name="star"]:checked');

    if (!content.trim() || !selectedStar) {
      alert('별점과 내용을 모두 입력해주세요!');
      return;
    }

    const stars = "★".repeat(selectedStar.value);
    const postItem = document.createElement('div');
    postItem.className = 'post-item';
    postItem.innerHTML = `
      <div style="color: #f1c40f; margin-bottom: 5px;">${stars}</div>
      <p style="margin:0;">${content}</p>
      <button class="reply-toggle" style="background:none; border:none; color:#58a6ff; cursor:pointer; font-size:0.8rem; margin-top:10px; padding:0; text-decoration:underline;">답글 달기</button>
      <div class="reply-area" style="display:none; margin-top:10px;">
        <textarea style="height:50px; font-size:0.85rem;" placeholder="답글 입력..."></textarea>
        <button class="reply-submit" style="margin-top:5px; padding:3px 10px; background:#30363d; color:white; border:none; border-radius:4px; cursor:pointer;">등록</button>
      </div>
      <div class="reply-list"></div>
    `;

    postItem.querySelector('.reply-toggle').onclick = function() {
      const area = postItem.querySelector('.reply-area');
      area.style.display = area.style.display === 'block' ? 'none' : 'block';
    };

    postItem.querySelector('.reply-submit').onclick = function() {
      const txt = postItem.querySelector('.reply-area textarea');
      if(!txt.value.trim()) return;
      const rep = document.createElement('div');
      rep.className = 'reply-container';
      rep.innerHTML = `<div style="font-size:0.9rem; color:#a5d6ff;">└ ${txt.value}</div>`;
      postItem.querySelector('.reply-list').appendChild(rep);
      txt.value = '';
      postItem.querySelector('.reply-area').style.display = 'none';
    };

    postContainer.prepend(postItem);
    document.getElementById('post-content').value = '';
    selectedStar.checked = false;
  });
});