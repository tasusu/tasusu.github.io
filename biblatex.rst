BibLaTeX
================================================================

申請書・公募書類作成のためのBibLaTeX活用術

.. contents:: 
    :depth: 1
    :local:
    :backlinks: none
    
準備
----------------------------
まず，自分の業績を一覧にしたbibファイルを作り，書類と同じディレクトリや ``$TEXMF/bibtex/bib/`` 以下など，TeXから参照できる場所に置きます．その際，雑誌論文は ``@article`` ，国際会議プロシーディングスは ``@inproceedings`` など，分類ごとにエントリの種類を変えておきます．DOIなど，含める可能性のある情報はすべて書いておき，出力時にBibLaTeX側のオプションで消すのがよいと思います．

BibLaTeXの基礎
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
BibLaTeXを使うには，以下のコードをプリアンブルに書きます．

.. code-block::

    \usepackage[backend=biber,style=alphabetic]{biblatex}
    \addbibresource{sample.bib}

- ``backend=biber`` はBibTeXではなくBiberというエンジンで処理せよという指定です．Overleafでは特に気にする必要はありませんが，オフライン環境でlatexmkを呼んでコンパイルしたり，手動でコンパイルしている場合は，BibTeXではなくBiberが呼ばれていることを確かめてください．
- ``style=alphabetic`` は"alphabetic"スタイルを使用せよという意味です．Overleafのページに `利用可能なスタイル一覧 <https://www.overleaf.com/learn/latex/Biblatex_bibliography_styles>`_ があります．
- ``\addbibresource{sample.bib}`` は ``sample.bib`` というファイルを読み込むという意味です． **拡張子が必要であることに注意．**

読み込んだbibファイルのすべてのエントリを対象とするには，BibTeX同様 ``\nocite{*}`` を書きます．

文献リストを表示するには ``\printbibliography`` を書きます．

応募書類の書式用オプション
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
応募書類でよくある書式（各リストは出版年の降順に並べ，業績には通し番号を付け，著者は省略せず全て表示する）は，以下のようにオプション指定すると良いと思います．

.. code-block::

    \usepackage[backend=biber,style=numeric,defernumbers=true,sorting=ydnt,giveninits=true,maxbibnames=99]{biblatex}

- ``defernumbers=true`` は業績リストに現れる順番で通し番号を付けるという意味
- ``sorting=ydnt`` は ``year`` の降順(**d** ecending)→ ``author`` の辞書順→ ``title`` の辞書順，の順番でソートするという意味
- ``giveninits=true`` は著者名をイニシャルで省略するという意味
- ``maxbibnames=99`` は99人までは"et al."で省略せず著者を表示するという意味

ソート順を変えたい場合など，細かいカスタマイズは `Overleafの解説 <https://www.overleaf.com/learn/latex/Bibliography_management_in_LaTeX#Reference_guide>`_ か `公式マニュアル <https://ctan.org/pkg/biblatex>`_ を参照してください．

出力に含める業績の種類をフィルタする
---------------------------------------------------
BibLaTeXでは ``\printbibliography`` の出力に含める項目をフィルタできます．例えば，書類の様式で「主著論文，国際会議論文，．．．」等，分類が指定されているときに，BibTeXの出力から手で1つ1つコピペする必要がなくなります．また，分類方法の指定が変わったとしても，コードを書き換えるだけで柔軟に対応できます．

- ``@article`` のみを出力したい場合
    
  .. code-block:: 

      \printbibliography[type=article]

- ``@article`` **以外を全て** 含める場合

  .. code-block:: 

      \printbibliography[nottype=article]


- ``@article`` と ``@proceedings`` 以外を全て含める場合

  .. code-block:: 

      \printbibliography[nottype=article,nottype=proceedings]

  ``nottype`` は複数指定できるので，「その他」の業績リストを作るのに便利です．

- ``@article`` と ``@proceedings`` など複数の種類を含めたり，複数の条件で指定される複雑なフィルタを作りたい場合は ``\defbibfilter`` を使います．たとえば

  .. code-block::

      \defbibfilter{papers}{
        type=article or
        type=inproceedings
      }

  とすると， ``@article`` と ``@proceedings`` のいずれかにマッチする ``papers`` フィルタが作成されます．その上で，

  .. code-block::

      \printbibliography[filter=papers]

  と書くと，フィルタにマッチしたエントリのみが出力されます．


主要業績のみ出力する
------------------------------------------------------------------

主要業績のみ出力した業績リストを作成したい場合があるかと思います．そのときは，bibファイルのエントリーに ``keywords`` フィールドを追加して対応すると便利です．たとえば，主要業績のエントリーには 

.. code-block:: bibtex

    @article{Soma2000,
        title = {Awesome Paper},
        author = {Soma, Tasuku},
        keywords = {selected}
    }

のように， ``keywords`` フィールドに ``selected`` 等，主要業績であることを示す要素を追加しておきます．その上で

.. code-block::

    \printbibliography[keyword=selected]

とすれば，主要業績のみが出力されます．


主要業績にマークを付ける
------------------------------------------------------------------
主要業績には★などのマークをつけよと指定されることもあるかと思います．その場合も，上の応用で， ``keywords`` フィールドに ``selected`` が含まれる場合に ``begentry`` （業績リストの各項目の先頭を表すマクロ）に★を挿入するコードを書けばOKです．

.. code-block::

    \renewbibmacro*{begentry}{%
      \ifkeyword{selected}
        {\textbf{★}}
        {}%
    }


自分の名前に下線を引く
------------------------------------------------------------------
業績リストで面倒なのが，自分（応募者・申請者）の名前に下線を引けという指示です．これも，BibLaTeXのdata annotation
機能を使うと簡単に対応できます．

基本編
~~~~~~~~~~~~~~~~~~~~~~~~~~~
まずは，bibファイルに ``author+an`` というフィールドを追加して，自分が何番目の著者かを書き，``me`` というアノテーションを付けます．

.. code-block:: bibtex

    @article{Soma2000,
        title = {Another Awesome Paper},
        author = {Satomi, Shuji and Soma, Tasuku and Zaizen, Goro},
        author+an = {2=me}
    }

その上で， ``me`` というアノテーションがついた著者名に下線を引くコードをLaTeX文書側に書きます．

.. code-block:: 

    \renewcommand*{\mkbibcompletename}[1]{%
      \ifitemannotation{me}
      {\underline{#1}}
      {#1}
    }

``\mkbibcompletename`` は各著者名全体の書式を処理するコマンドです．

応用編
~~~~~~~~~~~~~~~~~~~~
アノテーションは複数書けます．したがって，自分を下線にした上で，さらに責任著者は太字にせよという場合は，責任著者を表す ``corresp`` というアノテーションを付けてやります． **アノテーションの区切りはセミコロンであることに注意．**

.. code-block:: bibtex

    @article{Soma2000,
        title = {Another Awesome Paper},
        author = {Satomi, Shuji and Soma, Tasuku and Zaizen, Goro},
        author+an = {2=me; 1=corresp}
    }

その上で， ``corresp`` がついた著者名を太字にするコードを上の要領で書けばOKです．ここで注意したいのが， アノテーションが ``me`` と ``corresp`` の2種類あるので， ``\mkbibcompletename`` の定義の条件分岐が入れ子になる点です．


.. code-block:: 

    \renewcommand*{\mkbibcompletename}[1]{%
      \ifitemannotation{me}
      {\underline{#1}} % me
      {\ifitemannotation{corresp}
        {\textbf{#1}} % corresp
        {#1} % me でも corresp でもない
      }
    }

.. warning::

    残念ながら，同じ著者に複数のアノテーションをつけることはできないようです．自分が責任著者の場合に下線かつ太字にしたい場合は，それを表すアノテーション（ ``mecorresp`` 等）を別個作る必要があります．したがって，アノテーションの種類が増えると `組合せ爆発 <https://www.youtube.com/watch?v=Q4gTV4r0zRs>`_ で大変なことになるので，ほどほどに．

補足事項をつける
------------------------------------------------------------------
アピール事項や引用数などの補足事項を付け足す方法をいくつか紹介します．

基本編
~~~~~~~~~~~~~~~~~~~~
まずは簡単な方法から． ``note`` や ``addendum`` フィールドをbibファイルのエントリに書くと，その内容はそのまま出力されます． ``note`` は後半あたりに， ``addendum`` は末尾に出力されるという違いがあります．
よって，末尾に"best paper"と太字で書きたければ

.. code-block:: bibtex

    @article{Soma2000,
        title = {Awesome Paper},
        author = {Soma, Tasuku},
        addendum = {\textbf{best paper}}
    }

と書けばOKです．その他にも， `bibLaTeXには様々なフィールドが定義されている <https://www.overleaf.com/learn/latex/Bibliography_management_with_biblatex#Reference_guide>`_ ので，用途に合うフィールドがあれば，それを使うのが一番手っ取り早いでしょう．

応用編
~~~~~~~~~~~~~~~~~~~~
まれに，インパクトファクターや引用数を書けという指定もあるようです．残念ながら，bibLaTeXにはこれらに相当するフィールドは定義されていません．かといって，応募先に応じて毎回 ``note`` や ``addendum`` の内容を変えていては大変です．ここではbibファイルに独自フィールドを足して，それを出力するコードを追加することにします．このようにすれば，応募先に応じて表示する内容をカスタマイズできます．

ここでは，bibファイルのエントリに ``citation`` という引用数を表す独自フィールドを足してみましょう．

.. code-block:: bibtex

    @article{Soma2000,
        title = {Awesome Paper},
        author = {Soma, Tasuku},
        citation = {10}
    }

もちろん， ``citation`` は勝手に定義したフィールドなので，このままだとBibLaTeXに無視されて表示されません．そこで， 
① ``citation`` の中身をユーザーが使用できるカスタムフィールド ``usera`` に代入するよう ``\DeclareSourcemap`` で指定， ② ``usera`` フィールドの表示法を ``\DeclareFieldFormat`` で指定， ③末尾を表す ``finentry`` マクロを書き換えて ``usera`` フィールドを表示させるようにします．

.. code-block::

    \DeclareSourcemap{
      \maps[datatype=bibtex]{
        \map{
          \step[fieldsource=citation, fieldtarget=usera] % citation -> usera
        }
      }
    }
    \DeclareFieldFormat{usera}{（引用数:~#1）}
    \renewbibmacro*{finentry}{\printfield{usera}\finentry}

このようにすれば， ``citation`` が定義されたエントリには，引用数が（引用数: 10）と表示され，それ以外のエントリでは単に無視されるようになります．


.. note::

    BibLaTeXでは，ユーザーが使用できるカスタムフィールド ``usera`` ～ ``userf`` があらかじめ定義されています．したがって，その他の ``impactfactor`` などの独自フィールドを6つまでは表示できます．
