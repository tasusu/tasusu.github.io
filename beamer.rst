Beamer
==================================================
Beamerについての備忘録


はじめてのBeamer
----------------------------------------
この文書は，Beamer Users GuideのTutorialから内容を抽出したものです．


Get Started
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Beamerを作る手順は，普段LaTeX文書を作るときとほとんど一緒です．違うのはdocument classに ``beamer`` を指定するところです::

    \documentclass{beamer}

次にタイトル・著者名・日付をプリアンブルに書きます．いつも通りですね::

    \title{はじめてのBeamer}
    \author{高木貞治}
    \date{\today}

``\begin{document}`` の後には以下のように書いてみましょう::

    \begin{document}
    \maketitle
    \begin{frame}{スライド}
     スライドができたよ！やったね！
    \end{frame}
    \end{document}

出来上がったら，普通の文書と同じようにコンパイルしてPDFを生成してみましょう．2枚のスライドからなるPDFが出来上がるはずです．しかも ``\maketitle`` のおかげで，かっこいいタイトルスライドが勝手に出来上がっています．すごい！

frame環境はちょうど1枚のスライドに対応します．環境の中身に書いたものがスライドの中身になって出力されます．

目次を作る
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
目次も，LaTeXで文書の目次を作るときとほぼ同じ手順です．まずは2枚目のスライドの前に ``\section{}`` を追加しましょう::

    \section{はじめに}

次に ``\section{}`` の直後に以下のコードを追加します::

    \begin{frame}{}
     \tableofcontents
    \end{frame}

2枚目に目次の入ったスライドが追加されました．

フレームの中を埋める
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
3枚目のスライドがすこし寂しいので，もっと中身を追加してみましょう．frame環境の中では，itemize環境やenumerate環境などの使い慣れたLaTeXの環境を使うことができます．また，amsmathの定理環境によく似たtheorem, lemma, proof, corollary, exampleといった環境がbeamerの中でデフォルトで定義されています．

文字を強調したいときは ``\emph`` でも構いませんが，斜体になるだけなのでいまいち目立ちません．Beamerにはよく似た ``\alert`` コマンドがあり，こっちは文字を赤くしてくれます．

3枚目のスライドはこんな感じでしょうか::

    \begin{frame}
     \frametitle{はじめてのスライド}
     \begin{definition}
       1と自分自身しか約数を持たない数を\alert{素数}という．
     \end{definition}
     \begin{example}
      \begin{itemize}
       \item 2 は素数．
       \item 3 も素数．
       \item 4 は素数ではない．
      \end{itemize}
     \end{example}
     \end{frame}


Overlayを作る
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
よくPowerPointのスライドで，はじめは表示されていなかった文字がプレゼンターの操作によってパッと現れるのを見かけます．「アニメーション」と呼ばれる機能です．同様の機能が，Beamerでは **Overlay** と呼ばれます．

Overlayを作るお手軽な方法は ``\pause`` を使うことです::

      \begin{itemize}
       \item 2 は素数．
       \pause
       \item 3 も素数．
       \pause
       \item 4 は素数ではない．
      \end{itemize}

はじめは1個目の箇条書きしか表示されておらず，次に進むと2個目，さらに進むと3個目が表示されるようなスライドができます．PDFで見るとページ数が必要な分だけ増えます．3枚目のスライドは3コマのOverlayから成るので，PDFでは3ページ分になったはずです．


Overlay Specificationを使う
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``\pause`` では上から順番に表示していくようなOverlayしか作れません．もっと細かく動作を指定するためには **Overlay Specification** という機能を使います．

次のような新しいスライドを末尾に追加しましょう::

    \begin{frame}{素数は無限に存在する}
    \begin{theorem}
    素数は無限に存在する．
    \end{theorem}
    \begin{proof}
     \begin{enumerate}
      \item<1-> $p_1, \dots, p_n$ がすべての素数だと仮定する．
      \item<2-> $q:=p_1\dots p_n + 1$ とおく．
      \item<3-> すると $q$ はどの $p_1,\dots,p_n$ でも割り切れない．
      \item<1-> したがって，$q$は新たな素数を約数にもつことになって矛盾する．\qedhere
    \end{enumerate}
    \end{proof}
    \uncover<4->{証明は\alert{背理法}を使った．}
    \end{frame}


今度は，1番目と4番目の項目が最初から表示され，2番目の3番目が順に表示されたはずです． ``\item`` に付け加わった ``<1->`` などがOverlay Specificationです． ``<2->`` は「この要素は2コマ目以降に表示せよ」という意味になります． ``\uncover`` はBeamerのコマンドで，テキストに Overlay Specificationをつけたいときに使用します． 他にも ``<1>`` は「1コマ目だけ表示せよ」， ``<2-4>`` は「2〜4コマ目の間だけ表示せよ」という意味になります．

これで自由自在にOverlayを作ることができますね！


Blockを使う
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Beamerには， **Block** と呼ばれるテキストを囲うための箱があります．使い方は，書きたい中身をblock環境内に書くだけです::

    \begin{block}
     これはBlockの中身です．
    \end{block}

Themeを使う
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``\usetheme`` コマンドをプリアンブルに追加すると，スライドのThemeを変えることができます．また， ``\usecolortheme`` コマンドでThemeの配色も変えることができます::

    \usetheme{Warsaw}
    \usecolortheme{rose}


Overlay Specification
----------------------------------------
Overlay Specificationは，各要素につける ``<1->`` のようなオプションで，Overlayの順序を設定するのに使います．

=======================  ===========================================
Overlay Specification    意味
=======================  ===========================================
``<1>``                   1コマ目のみ表示
``<1-3>``                 1-3コマ目のみ表示
``<3->``                  3コマ目以降表示
``<-5>``                  5コマ目まで表示
``<1-3,5,7->``            1-3コマ目と5コマ目と7コマ目以降表示
=======================  ===========================================

\\onslide
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``\onslide`` で囲ったテキストやブロックは，消えているときでも表示されている時と同じスペースを占めます．使い方は ``\pause`` に似ています::

    \begin{frame}
     ここは1コマ目から表示される 
     \onslide<2-3>
     ここは2-3コマ目に表示される
     \begin{itemize}
     \item
     ここも2-3コマ目に表示される
     \onslide+<4->
     \item
     ここは4枚目以降に表示される
     \end{itemize}
     ここは4枚目以降に表示される
     \onslide
     ここはすべてのスライドで表示される 
     \end{frame}


\\only と \\uncover
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``\only{}`` で囲った部分は消えているときにはスペースを占めず，完全に存在しないものとして扱われます． 逆に ``\uncover{}`` で囲った部分は，消えているときでも現れているときと同じだけのスペースを占めます．


もろもろのTips
--------------------------------------------------
数式フォントをサンセリフ体にする
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::
    
    \renewcommand{\familydefault}{\sfdefault}
    
お好みでTXフォントにしてもよい::

    \usepackage{txfonts}


日本語フォントをゴシック体にする
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::

    \renewcommand{\kanjifamilydefault}{\gtdefault}
    
さらに， OTFパッケージを読み込むことでゴシック体を多ウェイト化できる．
すなわち， `\textbf` や `\alert` などが通常の文字より太いゴシック体になる::

    \usepackage[deluxe, expert]{otf}


PDFのしおりが文字化けする
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::

    \usepackage{atbegshi}
    \ifnum 42146=\euc"A4A2 \AtBeginShipoutFirst{\special{pdf:tounicode EUC-UCS2}}\else
    \AtBeginShipoutFirst{\special{pdf:tounicode 90ms-RKSJ-UCS2}}\fi

下の方にある変なアイコン（ナビゲーションシンボル）を消す
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::

    \setbeamertemplate{navigation symbols}{}
    

フッターをスライド番号だけにする
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::

    \setbeamertemplate{footline}[frame number]
    
サブセクション名を自動的にスライドタイトルにする
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
スライドタイトルの部分に ``\insertsubsection`` を書く::
     
    \begin{frame}{\insertsubsection} 

セクションの後に目次スライドを入れる
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
次のコマンドをプリアンブルに書く::

    \AtBeginSection[]{
        \frame{\tableofcontents[currentsection, hideallsubsections]} %目次スライド
    }

handoutモードに表示させない要素を作る
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``handout`` モードでオーバーレイを重ねて表示させると見栄えがよくないことがある．このとき，overlay specificationに ``<*|handout:0>`` をつけた要素は ``handout`` モードでは表示されなくなる．たとえば::

    \onslide<2-|handout:0>{...}

で囲った要素は通常モードでは ``<2->`` という overlay specification が適用されるが， ``handout`` モードでは表示されない．

only/onslideの前後で配置が微妙にずれるのを防ぐ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
``overprint`` 環境を使うのが手っ取り早い．
``itemize`` 環境の ``\item`` を ``\onslide<>`` にした感じで使う::

    \begin{overprint}
        \onslide<1> とある文章
        \onslide<2> なが〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜い文章
        \onslide<3> ほかの文章
    \end{overprint}

上の例では， ``overprint`` 環境全体が，2つ目の長い文章の大きさにフィットするように自動的に調整される．
