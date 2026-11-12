/**
 * ============================================================================
 * 滋賀大学陸上競技部 ウェブサイト 動作スクリプト (app.js)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. スマホ版 開閉式メニュー (Header)
  // --------------------------------------------------------------------------
  const menuBtn = document.getElementById("menu-btn");
  const menuBtnIcon = document.getElementById("menu-btn-icon");
  const headerNav = document.getElementById("header-nav");

  if (menuBtn && headerNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = headerNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      if (menuBtnIcon) {
        menuBtnIcon.textContent = isOpen ? "✕" : "☰";
      }
    });

    headerNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        if (menuBtnIcon) {
          menuBtnIcon.textContent = "☰";
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. FAQの開閉 (19:17 PC / 19:35 SP)
  // --------------------------------------------------------------------------
  const faqBoxes = document.querySelectorAll("[data-faq-box]");

  faqBoxes.forEach((box) => {
    const trigger = box.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = box.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      const baseQ = trigger.getAttribute("data-faq-question") || "";
      if (baseQ) {
        trigger.textContent = `${baseQ}  ${isOpen ? "−" : "＋"}`;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. お問い合わせ：入力チェック → 確認 → 送信完了・失敗の表示 (Yahoo!メール受信対応)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const confirmView = document.getElementById("form-confirm-view");
  const resultView = document.getElementById("form-result-view");
  const resultBanner = document.getElementById("form-result-banner");

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const consentInput = document.getElementById("contact-consent");

  const errName = document.getElementById("err-name");
  const errEmail = document.getElementById("err-email");
  const errMessage = document.getElementById("err-message");
  const errConsent = document.getElementById("err-consent");

  const confirmNameVal = document.getElementById("confirm-name-val");
  const confirmEmailVal = document.getElementById("confirm-email-val");
  const confirmMessageVal = document.getElementById("confirm-message-val");

  const btnBackEdit = document.getElementById("btn-back-edit");
  const btnSendFinal = document.getElementById("btn-send-final");
  const btnResetForm = document.getElementById("btn-reset-form");

  function validateForm() {
    let valid = true;

    // お名前チェック
    if (!nameInput.value.trim()) {
      nameInput.classList.add("has-error");
      errName.classList.add("visible");
      valid = false;
    } else {
      nameInput.classList.remove("has-error");
      errName.classList.remove("visible");
    }

    // メールアドレスチェック
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailInput.classList.add("has-error");
      errEmail.classList.add("visible");
      valid = false;
    } else {
      emailInput.classList.remove("has-error");
      errEmail.classList.remove("visible");
    }

    // お問い合わせ内容チェック
    if (!messageInput.value.trim()) {
      messageInput.classList.add("has-error");
      errMessage.classList.add("visible");
      valid = false;
    } else {
      messageInput.classList.remove("has-error");
      errMessage.classList.remove("visible");
    }

    // 同意チェック
    if (!consentInput.checked) {
      errConsent.classList.add("visible");
      valid = false;
    } else {
      errConsent.classList.remove("visible");
    }

    return valid;
  }

  if (contactForm && confirmView && resultView) {
    // 入力時にリアルタイムでエラー表示を解除
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        input.classList.remove("has-error");
      });
    });

    // Step 1: 「入力内容を確認する」ボタン押下時
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      confirmNameVal.textContent = nameInput.value.trim();
      confirmEmailVal.textContent = emailInput.value.trim();
      confirmMessageVal.textContent = messageInput.value.trim();

      contactForm.style.display = "none";
      confirmView.classList.add("active");
    });

    // Step 2a: 「修正する」ボタン押下時
    if (btnBackEdit) {
      btnBackEdit.addEventListener("click", () => {
        confirmView.classList.remove("active");
        contactForm.style.display = "flex";
      });
    }

    // Step 2b: 「送信する」ボタン押下時（部のYahoo!メール受信用エンドポイントまたはメール送信）
    if (btnSendFinal) {
      btnSendFinal.addEventListener("click", async () => {
        const payload = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        };

        const cfg = (typeof SITE_DATA !== "undefined" && SITE_DATA.contactConfig) || {};
        btnSendFinal.disabled = true;

        try {
          if (cfg.endpointUrl) {
            // Formspree や Google Apps Script 経由で部のYahoo!メールへ自動送信
            const response = await fetch(cfg.endpointUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify(payload)
            });

            if (!response.ok) {
              throw new Error(`送信エラー (${response.status})`);
            }

            resultBanner.className = "status-banner status-banner--success";
            resultBanner.innerHTML =
              "<strong>送信が完了しました。</strong><br>お問い合わせありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。";
          } else if (cfg.yahooEmail) {
            // メールクライアント経由で部のYahoo!メールへ送信
            const subject = encodeURIComponent(`【滋賀大学陸上競技部HP お問い合わせ】${payload.name}様`);
            const body = encodeURIComponent(
              `お名前: ${payload.name}\nメールアドレス: ${payload.email}\n\nお問い合わせ内容:\n${payload.message}`
            );
            window.location.href = `mailto:${cfg.yahooEmail}?subject=${subject}&body=${body}`;

            resultBanner.className = "status-banner status-banner--success";
            resultBanner.innerHTML =
              "<strong>メール作成画面を起動しました。</strong><br>メールソフトから送信を完了してください。";
          } else {
            // 接続・宛先設定前の確認モード（完了表示の確認が可能）
            resultBanner.className = "status-banner status-banner--success";
            resultBanner.innerHTML =
              "<strong>【確認モード】送信完了表示テスト</strong><br>入力チェックおよび確認ステップが完了しました（※現在、送信先の部のYahoo!メールは接続・宛先設定前です。data.js の contactConfig で接続後に実送信されます）。";
          }
        } catch (err) {
          resultBanner.className = "status-banner status-banner--error";
          resultBanner.innerHTML =
            "<strong>送信に失敗しました。</strong><br>通信環境をご確認のうえ再度お試しいただくか、各キャンパスのInstagramのDMよりご連絡ください。";
        } finally {
          btnSendFinal.disabled = false;
          confirmView.classList.remove("active");
          resultView.classList.add("active");
        }
      });
    }

    // Step 3: 「新しいお問い合わせを入力する」ボタン押下時
    if (btnResetForm) {
      btnResetForm.addEventListener("click", () => {
        contactForm.reset();
        resultView.classList.remove("active");
        contactForm.style.display = "flex";
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. スマホ表示プレビュー機能
  // --------------------------------------------------------------------------
  const previewBtn = document.getElementById("mobile-preview-btn");
  const previewModal = document.getElementById("mobile-preview-modal");
  const previewClose = document.getElementById("mobile-preview-close");
  const previewIframe = document.getElementById("mobile-preview-iframe");

  if (window.location.search.includes("mobile_preview=1") && previewBtn) {
    previewBtn.style.display = "none";
  }

  if (previewBtn && previewModal && previewClose && previewIframe) {
    previewBtn.addEventListener("click", () => {
      const baseUrl = window.location.href.split("?")[0].split("#")[0];
      previewIframe.setAttribute("src", `${baseUrl}?mobile_preview=1`);
      previewModal.classList.add("open");
      previewModal.setAttribute("aria-hidden", "false");
    });

    previewClose.addEventListener("click", () => {
      previewModal.classList.remove("open");
      previewModal.setAttribute("aria-hidden", "true");
    });

    previewModal.addEventListener("click", (e) => {
      if (e.target === previewModal) {
        previewModal.classList.remove("open");
        previewModal.setAttribute("aria-hidden", "true");
      }
    });
  }
});
