$(function() {
    // aos
    init_aos();

    // mb ham menu
    var burger = $('.mobile-header-nav-btn');
    burger.each(function(index){
        $(this).on('click', function(e){
            e.preventDefault();
            $(this).toggleClass('active');

            if ($(this).hasClass('active')) {
                $('.header-gnb-wrap').addClass('active');
            } else {
                $('.header-gnb-wrap').removeClass('active');
            }
        });
    });
})


function init_aos() {
    AOS.init({
        duration: 1000,
        easing: "ease-in-back",
        once: false
    });
}
function apply_check(f) {
    let code_chk = false;
    if ( f.student_code.value == user_code[0] ) {
        if ( f.write_name.value != user_code[1] ) {
            code_chk = false;
        } else {
            code_chk = true;
        }
    } else {
        code_chk = false;
    }

    if ( code_chk == true ) {
        let result_html =   '<div class="pop-result-wrap">' +
                                '<h5>조회결과</h5>' +
                                '<div class="rs-container">' +
                                    '<div class="rs-con">' +
                                        '<span>수험번호</span><span class="rs-txt">'+user_code[0]+'</span>' +
                                    '</div>' +
                                    '<div class="rs-con">' +
                                        '<span>성명</span><span class="rs-txt">'+user_code[1]+'</span>' +
                                    '</div>' +
                                    '<div class="rs-con">' +
                                        '<span>응시상태</span><span class="rs-txt rs-complete">'+user_code[2]+'</span>' +
                                    '</div>' +
                                    '<div class="rs-con">' +
                                        '<span>최종제출</span><span class="rs-txt">'+user_code[3]+'</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
        alert('응시 조회 완료하였습니다');
        if ($applyChk_pop.querySelector('.pop-result-wrap')){
            $applyChk_pop.querySelector('.pop-result-wrap').remove();
        }
        $applyChk_pop.querySelector('.inner').insertAdjacentHTML('beforeend',result_html);
        return true;
    } else {
        alert('수험번호 및 성명을 정확하게 확인해주세요.');
        if ($applyChk_pop.querySelector('.pop-result-wrap')){
            $applyChk_pop.querySelector('.pop-result-wrap').remove();
        }
        popFocusInput();
        return false;
    }
}

// 로그인 관련
// 유저 임시 코드
let user_code = ['hong', 'select2024', '홍길동'];

function login(f) {
    let login_chk = false;
    let error_code = 0;
    if ( f.user_id.value == user_code[0] ) {
        if ( f.user_password.value != user_code[1] ) {
            login_chk = false;
            error_code = 1;
        } else {
            login_chk = true;
        }
    } else {
        login_chk = false;
    }

    if ( login_chk == true ) {
        return true;
    } else {
        if ( error_code == 0 ) {
            alert('아이디 정보가 없습니다. 다시 확인해주세요.');
            f.user_id.focus();
        } else {
            alert('비밀번호를 정확하게 입력해주세요.');
            f.user_password.focus();
        }
        return false;
    }
}

function password_change(f) {
    let passchange_chk = false;
    let error_code = 0;

    if ( f.user_id.value == user_code[0] ) {
        if ( f.before_password.value != user_code[1] ) {
            passchange_chk = false;
            error_code = 1;
        } else {
            if ( f.before_password.value == f.user_password.value ) {
                passchange_chk = false;
                error_code = 2;
            } else {
                if ( f.user_password.value != f.user_password2.value ) {
                    passchange_chk = false;
                    error_code = 3;
                } else {
                    passchange_chk = true;
                }
            }
        }
    } else {
        passchange_chk = false;
    }

    if ( passchange_chk == true ) {
        return true;
    } else {
        switch (error_code) {
            case 0:
                alert('아이디 정보가 없습니다. 다시 확인해주세요.');
                f.user_id.focus();
                break;
            case 1:
                alert('비밀번호를 정확하게 입력해주세요.');
                f.before_password.focus();
                break;
            case 2:
                alert('이전 비밀번호와 동일합니다. 다르게 설정해주세요.');
                f.user_password.focus();
                break;
            case 3:
                alert('변경하려는 비밀번호가 다릅니다. 다시 입력해주세요.');
                f.user_password2.focus();
                break;
            default:
                alert('에러가 발생했습니다. 다시 확인부탁드립니다.');
                f.user_id.focus();
                break;
        }
        return false;
    }
}

// selectIN
$selectIN_form = document.querySelector('form[name="selectINForm"]');
$selectIN2_form = document.querySelector('form[name="selectIN2Form"]');
if ( $selectIN_form ) {
    let si_status = $selectIN_form.querySelector('input[name="select_status"]').value;
    if ( si_status == 1 ) {
        setTimeout(() => {
            alert('본 계정은 Select IN(채용평가솔루션)과\n연동되어 있지 않습니다.\n연동 및 계약 관련 문의사항은\n고객사 담당직원에게 문의하시기 바랍니다.');
        }, '1000');
    }
}

function select_in_key(f) {
    let unlink_agree = confirm('연동 해제 하시겠습니까?');
    if (unlink_agree == true) {
        return true;
    } else {
        return false;
    }
}

function bbs_write(f) {
    let alarm_msg;
    if (f.mode.value == 'update') {
        if ( f.type.value == 'read' ) {
            f.type.value = 'update';
            f.content.readOnly = false;
            f.content.classList.remove('type-text');
            f.content.focus();
            return false;
        } else if ( f.type.value == 'update' ) {
            alarm_msg = '답변이 수정되었습니다.';
            alert(alarm_msg);
            return true;
        }
    } else if (f.mode.value == 'reg') {
        alarm_msg = '답변이 등록되었습니다.';
        alert(alarm_msg);
        return true;
    }
}

// main app 선언
$app = document.querySelector('main#app');

// window 타입이 아닐 경우 layout 관련된 사항 실행
if ( !($app.classList.contains('app-window-type') || $app.classList.contains('app-login-type')) ) {
    init_page();        // 최초 실행
} else {
    init_loginPage();   // 최초 실행
}

function init_page(){
    $header_el = document.querySelector('#header');
    $header_logo = document.querySelector('#logo-img');
    let header_height = $header_el.offsetHeight;
    let scrolled = document.querySelector('html').scrollTop;

    let sticky_header = () => {
        if(scrolled > header_height){
            $header_el.classList.remove('top');
            $header_el.classList.add('scroll');
        } else {
            $header_el.classList.remove('scroll');
            $header_el.classList.add('top');
        }
    }

    sticky_header();
    window.addEventListener('scroll', () => {
        scrolled = document.querySelector('html').scrollTop;
        sticky_header();
    })

    subpage_height();
    function subpage_height() {
        if ( $app.offsetHeight < window.innerHeight ) {
            $app.querySelector('#subpage-sec').
                style.minHeight = (window.innerHeight - $app.querySelector('#header').offsetHeight) + 'px';
        }
    }
    // window resize
    window.addEventListener('resize', function() {
        subpage_height();
    });
}

function init_loginPage() {

}

// 로그인시 인풋 입력
$input_type1 = document.querySelectorAll('.input-wrap input');
$input_type1.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if ( input.closest('.input-wrap').classList.contains('type1') ) {
            if ( input.value.length > 0 ) {
                input.closest('.input-wrap').classList.add('valued');
            } else {
                input.closest('.input-wrap').classList.remove('valued');
            }
        }
        let dataType = input.getAttribute('data-type');
        let regex, rtn, ipVal;
        switch(dataType) {
            case 'user_id':
                regex = /^[a-zA-Z0-9]*$/g;
            default:
                regex = /^[a-zA-Z0-9]*$/g;
        }
        ipVal = input.value.toString();
        if (regex) {
            if ( regex.test(ipVal) === false ) {
                rtn = ipVal.replace(/^[a-zA-Z0-9]*$/g,'');
                input.value = rtn;
                return false;
            }
        }
    });
});

// faq 게시판 타입 클릭 이벤트 코드
$bbs_faq_btn = document.querySelectorAll('.bbs-wrap.type-faq .question');

$bbs_faq_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const faqItem = btn.parentNode;
        const isActive = faqItem.classList.contains('active');

        removeActiveClasses();

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
function removeActiveClasses() {
    $bbs_faq_btn.forEach((btn) => {
        btn.parentNode.classList.remove('active');
    });
}
$logout_btn = document.querySelector('.logout-btn');
$sort_btn = document.querySelector('.sort-btn');
$sortVal_btn = document.querySelectorAll('.sort-list a');
$inquiryPop_btn = document.querySelector('.inquiry-pop-btn');

$applyChk_btn = document.querySelectorAll('.apply-check-btn');
$applyProgress_btn = document.querySelector('.apply-progress-btn');
$aConfirm_btn = document.querySelector('.a-confirm-btn');
$popClose_btn = document.querySelectorAll('.pop-close-btn');
$deepBg = document.querySelector('.deep-bg');
$allPop = document.querySelectorAll('.pop-layer');

$applyChk_pop = document.querySelector('.apply-check-pop');
$applyLogin_pop = document.querySelector('.apply-login-pop');
$applyNoti_pop = document.querySelector('.apply-notification-pop');


$inquiryReg_pop = document.querySelector('.pop-inquiry-reg');
$inquiryReg_pop_close = document.querySelector('.pop-inquiry-reg .close-btn');
if ( $inquiryReg_pop_close ) {
    $inquiryReg_pop_close.addEventListener('click', () => {
        closePop();
    });
}

if ( $logout_btn ) {
    $logout_btn.addEventListener('click', () => {
        let logout_agree = confirm('로그아웃 하시겠습니까');
        if ( logout_agree == true ) {
            location.href = './login.html';
        }
    });
}
if ( $sort_btn ) {
    $sort_btn.addEventListener('click', () => {
        $sort_btn.closest('.sort-wrap').querySelector('.sort-list').classList.toggle('active');
        $sort_btn.querySelector('.arrow').classList.toggle('active');
    });
}
if ( $sortVal_btn ) {
    $sortVal_btn.forEach((btn) => {
        btn.addEventListener('click', () => {
            let dataSort = btn.getAttribute('data-sort');
            btn.closest('.sort-wrap').querySelector('.sort-list').classList.toggle('active');
            btn.closest('.sort-wrap').querySelector('.arrow').classList.toggle('active');
            btn.closest('.sort-wrap').querySelector('.sort-value-txt').innerText = dataSort + '개씩';
        });
    });
}
if ( $inquiryPop_btn ) {
    $inquiryPop_btn.addEventListener('click', () => {
        $inquiryReg_pop.classList.toggle('view');
        setDeepBg();
    });
}

function inquiry_write(f) {
    alert('문의가 등록되었습니다.');
    return true;
}


if ( $applyChk_btn ) {
    $applyChk_btn.forEach((btn) => {
        btn.addEventListener('click', () => {
            $applyChk_pop.classList.toggle('view');
            setDeepBg();
        });
    });
}
if ( $popClose_btn ) {
    $popClose_btn.forEach((btn) => {
        btn.addEventListener('click', () => {
            closePop();
        });
    });
}
if ( $applyProgress_btn ) {
    $applyProgress_btn.addEventListener('click', () => {
        $applyLogin_pop.classList.toggle('view');
        setDeepBg();
    });
}
if ( $aConfirm_btn ) {
    $aConfirm_btn.addEventListener('click', () => {
        $applyNoti_pop.classList.remove('view');
        $applyLogin_pop.classList.add('view');
        setDeepBg();
    });
}
function setDeepBg() {
    $deepBg.classList.add('view');
    $deepBg.addEventListener('click', () => {
        closePop();
    });
    popFocusInput();
}
function popFocusInput() {
    $allPop.forEach((pop) => {
        if (pop.classList.contains('view')) {
            if ( pop.querySelector('input') ) {
                pop.querySelector('input').focus();
            }
        }
    });
}
function closePop() {
    $deepBg.classList.remove('view');
    $allPop.forEach((pop) => {
        if (pop.classList.contains('view')) {
            pop.classList.remove('view');
            pop.querySelectorAll('input').forEach((input) => {
                input.value = '';
            });
        }
        if (pop.querySelector('.pop-result-wrap')){
            pop.querySelector('.pop-result-wrap').remove();
        }
    });
}

// more info 더 알아보기 클릭이벤트
$moreInfo_tab = document.querySelectorAll('.blue-tab-wrap .blue-tab');
$moreInfo_tabConWrap = document.querySelector('.tab-content-wrap');
if ( $moreInfo_tab ) {
    $moreInfo_tab.forEach((btn,index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!btn.classList.contains('active')) {
                btn.closest('.blue-tab-wrap').querySelector('.blue-tab.active').classList.remove('active');
                btn.classList.add('active');
                $moreInfo_tabConWrap.querySelector('.active').classList.remove('active');
                $moreInfo_tabConWrap.querySelectorAll('.tab-content')[index].classList.add('active');
            }
        });
    });
}
$moreInfo_close = document.querySelector('.apply-w-close-btn');
if ( $moreInfo_close ) {
    $moreInfo_close.addEventListener('click', () => {
        alert('닫기 클릭');
    });
}




