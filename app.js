/**
 * ============================================================================
 * 滋賀大学陸上競技部 ウェブサイト 動作スクリプト (app.js)
 * ============================================================================
 * 1. スマホ版 開閉式メニュー (Header)
 * 2. トップページ：FAQの開閉
 * 3. トップページ：お問い合わせ入力チェック・確認・完了／失敗表示（Yahoo!メール受信対応）
 * 4. 部員紹介ページ：1〜4回生・大学院生（院生）の切り替え
 * 5. 滋賀大記録ページ：カテゴリ切り替え ＆ 詳細から保持者・大会・達成日・会場の表示
 * 6. スマホ表示プレビュー機能
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

    if (!nameInput.value.trim()) {
      nameInput.classList.add("has-error");
      errName.classList.add("visible");
      valid = false;
    } else {
      nameInput.classList.remove("has-error");
      errName.classList.remove("visible");
    }

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

    if (!messageInput.value.trim()) {
      messageInput.classList.add("has-error");
      errMessage.classList.add("visible");
      valid = false;
    } else {
      messageInput.classList.remove("has-error");
      errMessage.classList.remove("visible");
    }

    if (!consentInput.checked) {
      errConsent.classList.add("visible");
      valid = false;
    } else {
      errConsent.classList.remove("visible");
    }

    return valid;
  }

  if (contactForm && confirmView && resultView) {
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        input.classList.remove("has-error");
      });
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      confirmNameVal.textContent = nameInput.value.trim();
      confirmEmailVal.textContent = emailInput.value.trim();
      confirmMessageVal.textContent = messageInput.value.trim();

      contactForm.style.display = "none";
      confirmView.classList.add("active");
    });

    if (btnBackEdit) {
      btnBackEdit.addEventListener("click", () => {
        confirmView.classList.remove("active");
        contactForm.style.display = "flex";
      });
    }

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
            const subject = encodeURIComponent(`【滋賀大学陸上競技部HP お問い合わせ】${payload.name}様`);
            const body = encodeURIComponent(
              `お名前: ${payload.name}\nメールアドレス: ${payload.email}\n\nお問い合わせ内容:\n${payload.message}`
            );
            window.location.href = `mailto:${cfg.yahooEmail}?subject=${subject}&body=${body}`;

            resultBanner.className = "status-banner status-banner--success";
            resultBanner.innerHTML =
              "<strong>メール作成画面を起動しました。</strong><br>メールソフトから送信を完了してください。";
          } else {
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

    if (btnResetForm) {
      btnResetForm.addEventListener("click", () => {
        contactForm.reset();
        resultView.classList.remove("active");
        contactForm.style.display = "flex";
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. 部員紹介ページ：1〜4回生・大学院生（院生）で切り替える (19:82 PC / 19:102 SP)
  // --------------------------------------------------------------------------
  const gradeTabs = document.querySelectorAll("[data-grade-tab]");
  const membersGradeHeading = document.getElementById("members-grade-heading");
  const membersCardsGrid = document.getElementById("members-cards-grid");

  function renderMembersForGrade(gradeKey) {
    if (!membersCardsGrid || typeof SITE_DATA === "undefined" || !SITE_DATA.membersByGrade) return;

    const list = SITE_DATA.membersByGrade[gradeKey] || [];
    if (membersGradeHeading) {
      membersGradeHeading.textContent = gradeKey === "院生" ? "大学院生（院生）" : gradeKey;
    }

    membersCardsGrid.innerHTML = list
      .map(
        (m) => `
        <article class="member-card">
          <div class="member-card-top">
            <p class="member-event-tag">${m.eventTag}</p>
            <p class="member-num">${m.num}</p>
          </div>
          <p class="member-kana">${m.kana}</p>
          <h3 class="member-name">${m.name}</h3>
          <p class="member-faculty">${m.facultyGrade}</p>
          <div class="member-details">
            <p>出身高校   ${m.highSchool}</p>
            <p>専門種目   ${m.specialty}</p>
          </div>
          <div class="member-pb-box">
            <p class="member-pb-label">PERSONAL BEST</p>
            <p class="member-pb-value">${m.pb}</p>
          </div>
          <p class="member-comment">${m.comment}</p>
        </article>
      `
      )
      .join("");
  }

  if (gradeTabs.length > 0 && membersCardsGrid) {
    gradeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const gradeKey = tab.getAttribute("data-grade-tab") || "1回生";

        gradeTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });

        renderMembersForGrade(gradeKey);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. 滋賀大記録ページ：カテゴリ別切り替え ＆ 詳細表示 (19:118 PC / 19:138 SP)
  // --------------------------------------------------------------------------
  const recordCatTabs = document.querySelectorAll("[data-record-cat]");
  const recordsCatHeading = document.getElementById("records-cat-heading");
  const recordsMenList = document.getElementById("records-men-list");
  const recordsWomenList = document.getElementById("records-women-list");

  const recordDetailSection = document.getElementById("record-detail-section");
  const recordDetailCard = document.getElementById("record-detail-card");
  const detailEventTitle = document.getElementById("detail-event-title");
  const detailRecordValue = document.getElementById("detail-record-value");
  const detailHolder = document.getElementById("detail-holder");
  const detailDate = document.getElementById("detail-date");
  const detailTournament = document.getElementById("detail-tournament");
  const detailPlace = document.getElementById("detail-place");
  const detailCloseBtn = document.getElementById("detail-close-btn");

  let currentRecordCategory = "track";

  function updateDetailCard(genderLabel, item) {
    if (!item || !recordDetailCard) return;
    recordDetailCard.style.display = "flex";
    if (detailEventTitle) detailEventTitle.textContent = `${genderLabel} ${item.event}`;
    if (detailRecordValue) detailRecordValue.textContent = item.record;
    if (detailHolder) detailHolder.textContent = item.holder || "—";
    if (detailDate) detailDate.textContent = item.date || "—";
    if (detailTournament) detailTournament.textContent = item.tournament || "—";
    if (detailPlace) detailPlace.textContent = item.place || "—";
  }

  function renderRecordList(container, items, genderLabel, selectFirstByDefault) {
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = `<p class="records-empty-msg">現在このカテゴリの${genderLabel}記録データは登録されていません。</p>`;
      return;
    }

    container.innerHTML = items
      .map((item, idx) => {
        const isFirstSelected = selectFirstByDefault && idx === 0;
        return `
          <div class="record-item-wrap">
            <button type="button" class="record-row-btn${isFirstSelected ? " is-selected" : ""}"
              data-gender="${genderLabel}"
              data-idx="${idx}"
              aria-expanded="${isFirstSelected ? "true" : "false"}">
              <span class="record-row-event">${item.event}</span>
              <span class="record-row-val">${item.record}</span>
              <span class="record-row-plus">${isFirstSelected ? "−" : "＋"}</span>
            </button>
            <div class="record-inline-detail${isFirstSelected ? " is-open" : ""}">
              <div class="record-inline-line"><span>記録保持者</span><strong>${item.holder || "—"}</strong></div>
              <div class="record-inline-line"><span>達成日</span><span>${item.date || "—"}</span></div>
              <div class="record-inline-line"><span>大会</span><span>${item.tournament || "—"}</span></div>
              <div class="record-inline-line"><span>会場</span><span>${item.place || "—"}</span></div>
            </div>
          </div>
        `;
      })
      .join("");

    // 各行クリックでインライン詳細を開閉し、下部の RECORD DETAIL カードも同時更新
    container.querySelectorAll(".record-row-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-idx") || 0);
        const item = items[idx];
        const wrap = btn.closest(".record-item-wrap");
        const inlineDetail = wrap ? wrap.querySelector(".record-inline-detail") : null;
        const plusIcon = btn.querySelector(".record-row-plus");

        const wasOpen = inlineDetail ? inlineDetail.classList.contains("is-open") : false;

        // 他の行の選択状態をリセット
        document.querySelectorAll(".record-row-btn").forEach((b) => {
          b.classList.remove("is-selected");
          b.setAttribute("aria-expanded", "false");
          const p = b.querySelector(".record-row-plus");
          if (p) p.textContent = "＋";
        });
        document.querySelectorAll(".record-inline-detail").forEach((d) => {
          d.classList.remove("is-open");
        });

        if (!wasOpen) {
          btn.classList.add("is-selected");
          btn.setAttribute("aria-expanded", "true");
          if (plusIcon) plusIcon.textContent = "−";
          if (inlineDetail) inlineDetail.classList.add("is-open");
          updateDetailCard(genderLabel, item);
        }
      });
    });
  }

  function renderRecordsCategory(catKey) {
    if (typeof SITE_DATA === "undefined" || !SITE_DATA.recordsByCategory) return;
    const catData = SITE_DATA.recordsByCategory[catKey];
    if (!catData) return;

    currentRecordCategory = catKey;
    if (recordsCatHeading) {
      recordsCatHeading.textContent = catData.label;
    }

    renderRecordList(recordsMenList, catData.men, "男子", true);
    renderRecordList(recordsWomenList, catData.women, "女子", false);

    // 初期詳細カードを先頭の記録にセット
    if (catData.men && catData.men.length > 0) {
      updateDetailCard("男子", catData.men[0]);
    } else if (catData.women && catData.women.length > 0) {
      updateDetailCard("女子", catData.women[0]);
    }
  }

  if ( recordsMenList && recordsWomenList ) {
    renderRecordsCategory(currentRecordCategory);

    recordCatTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const catKey = tab.getAttribute("data-record-cat") || "track";
        recordCatTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });
        renderRecordsCategory(catKey);
      });
    });

    if (detailCloseBtn && recordDetailCard) {
      detailCloseBtn.addEventListener("click", () => {
        recordDetailCard.style.display = "none";
        document.querySelectorAll(".record-row-btn").forEach((b) => {
          b.classList.remove("is-selected");
          b.setAttribute("aria-expanded", "false");
          const p = b.querySelector(".record-row-plus");
          if (p) p.textContent = "＋";
        });
        document.querySelectorAll(".record-inline-detail").forEach((d) => {
          d.classList.remove("is-open");
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. スマホ表示プレビュー機能
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
