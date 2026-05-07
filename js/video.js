$(function () {

  let sp = 1000,
    easing = 'easeOutBounce';

  let $modal = $('.modal'),
    $closeBtn = $modal.find('.close-btn'),
    $video = $modal.find('video');

  let vidSrc, mov, idx;

  $('.vid-wrap article')
    .on('mouseenter', function () {
      let $this = $(this);

      vidSrc = $this.find('video').get(0);

      // 동영상 재생
      vidSrc.play();

      // 동영상 시작 시간 지정
      vidSrc.currentTime = 0;

      // 아티클 가로 늘리기 => 22%
      $this.stop().animate({
        width: '22%'
      }, function () {
        $this.find('h4').show().stop()
          .animate({ right: 30 })

        $this.find('h4 + p').show().stop()
          .delay(200)
          .animate({ right: 20 })

      })

      // 동영상 배경 나타나는 효과
      $this.find('video').stop().fadeIn()

    })
    .on('mouseleave', function () {
      let $this = $(this);
      vidSrc = $this.find('video').get(0);

      // 동영상 멈춤
      vidSrc.pause();

      // 아티클 원래 크기로 => 가로 12%
      $this.stop().animate({
        width: '12%'
      });

      $this.find('h4, h4+p')
        .stop()
        .fadeOut(100)
        .css({ right: -230 })

      // 동영상 배경 사라지는 효과
      $this.find('video').stop().fadeOut('slow');
    })
    .on('click', function () {

      // 모달창 열기
      $modal.stop().slideDown(sp, easing);

      // 인덱스값 선언
      idx = $(this).index();        // 클릭시 상단 전역 변수 idx에 저장

      // 인덱스값에 해당하는 영상 선언
      mov = $video.eq(idx).get(0);  // 클릭시 상단 전역 변수 mov에 저장
      // $video: 전체 비디오들이 담긴 큰 바구니
      // .eq(idx): 그중 클릭한 인덱스(idx)에 해당하는 비디오 딱 하나만 담은 작은 바구니 (알맹이는 비디오 하나)
      // .get(0): 그 작은 바구니 안에 들어있는 첫 번째(0번) 알맹이를 쏙 꺼냄

      // 영상 시작 시간
      mov.currentTime = 0;

      // video태그 열기
      $video.eq(idx).stop().slideDown()
        .prop({           // boolean데이터 다룰때 사용
          muted: false    // muted는 'true=소리O/false=소리X'인 boolean데이터
        });

      // 영상 재생
      mov.play();
    });

  // 모달창 닫기
  $closeBtn.on('click', function () {
    $modal.stop().slideUp();
    $video.stop().fadeOut()
      .prop({
        muted: true,
        controls: false
      });
    mov.pause();
  });
});