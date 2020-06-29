'use strict';
//HTMLの各タグをjavascriptに取り込むためにきめる変数
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したHTML要素の子要素をすべて削除する
 * @param=引数 {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
    //テキストフィールド上でEnterが押されたときに診断してくれる関数
    userNameInput.onkeydown = (event) => { //username変数のonkeydownされたとき関数発動
    if(event.key ==='Enter'){ //テキストフィールド上でEnterが押されたとき
        assessmentButton.onclick(); //onclick()関数を呼び出す。
    }
}
    assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return; //ガード句　何も入力されない場合関数を終了する
    }

    //resultDiVidedにおける子要素をすべて消す関数
    removeAllChildren(resultDivided);

    //TODO 診断結果表示エリアの作成
    const header = document.createElement('h3');　//headerという変数にh3タグを作成
    header.innerText = '診断結果';　//h3タグに診断結果を表示
    resultDivided.appendChild(header); //resultエリアに子要素header変数を表示

    const paragraph = document.createElement('p');//paragraphという変数にpタグを作成
    const result= assessment(userName);　//resultという変数にassessment関数の結果を代入
    paragraph.innerText =result; //pタグにresultの文字列を表示
    resultDivided.appendChild(paragraph); //resultエリアに子要素paragraph変数を表示

    //tweetエリアの作成
    removeAllChildren(tweetDivided);
    //anchor = aタグの略称　診断後にツイートするリンクを表示する方法
    const anchor = document.createElement('a');　//anchorという変数にaタグを作成
    //hrefValueという変数にリンクタグを代入
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);//hrefという要素に新しい属性の追加
    anchor.className = 'twitter-hashtag-button';//classNameを代入
    anchor.setAttribute('data-text', result);//data-textという要素に診断結果の文章という属性を追加
    anchor.innerText = 'Tweet #あなたのいいところ'; //タグとタグの間に文章を追加
    tweetDivided.appendChild(anchor);
    // widgets.jsの設定
    twttr.widgets.load();
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0; //変数sumOfCharCodeの宣言と初期化
    for ( let i= 0 ; i < userName.length; i++){　//文字の長さ文だけ繰り返す
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); //ユーザの名前の文字列を配列とみなしコード番号を取得する
    }
    const index = sumOfCharCode % answers.length; //すべての文字列のコード番号を足した数を用意した回答の配列の大きさで割そのあまりをindexに代入する
    let result = answers[index]; //indexに代入した数を回答の配列に入れ答えとして表示する
    result = result.replace(/\{userName\}/g,userName);

    return result; //resultを回答として返す
}
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎')
);
