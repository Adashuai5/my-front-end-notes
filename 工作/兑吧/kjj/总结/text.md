大家好，感谢大家抽空再次参加我的转正述职汇报，很遗憾上次的表现不尽如人意，希望今天能给大家带来不一样的感受



首先简单介绍一下我自己，我叫周元达，是2020年7月20日入职于我们公司，职位是前端开发，主要负责客集集直播以及开单助手的业务需求的开发工作



接下来我会从试用期工作情况，自我评价，及后期规划三个方面来进行汇报

在试用期工作情况中我会阐述我在工作中遇到的困难、产出及其中的经验教训，在自我评价中会讲讲试用期的成长及优缺点，并在后期规划中对我的不足作了针对性的解决方案及目标制定



首先是试用期工作情况

这是我从7月份入职到现在的需求总览，林林总总参与了直播小程序以及开单助手的大小优化。下面我会在这之中挑选两个有特点的案例来讲讲我的学习和体会



代理人切换团队遇到的问题及我的反思

我先简单介绍一下这个需求的背景

保险公司的代理人，需要先加入团队才能进行后续操作，同时会存在切换团队的需求，因为某些公司的团队数量可能会比较多，所以我们提供了一个团队名称搜索的功能，方便代理人快速查找到目标团队进行切换。

考虑到当时后端还没有 ES 搜索引擎的支持，对于此类模糊查询在大量数据的情况下开销会比较大，接口性能不会很好，接口返回时间可能比较长，既占用服务端资源，又影响用户的体验，再结合当时线上公司的团队情况分析，公司的团队数据不超过200，所以考虑前端从服务端一次性获取 200 条团队数据到用户本地，在前端实现搜索、匹配功能，以便减小开销和提供更好的用户体验。

上线一段时间后，随着我们客户体量的增长，很多公司的团队已经超过了200
因此有客户反馈搜不到自己要的团队，原因是他公司团队超过200，前端只会获取前 200 条数据，所以200条之外的数据并没有被获取到本地，搜索的时候也就查询不到这部分数据。
这个时候，后端已经有了 ES 搜索引擎的支持，于是我们新的方案就是从前端搜索改为后端通过 ES 进行搜索，因为 ES 能够做到全量的搜索，不再有 200 条的限制，能够很好的解决用户的问题。
有了思路之后，接下来就是排期、开发的安排了，根据当时情况，我评估出的时间是第二天早上能够解决这个问题并上线，但是实际结果却并不理想，出现了一些评估之外的问题影响了进度，导致上线时间从第二天上午，一直拖到了第二天下午。
主要原因是制定方案的时候，没有考虑周全，本以为只要将本地搜索改为调用接口进行搜索然后展示就可以了，但实际上改为后端搜索之后，要处理的情况比想相中的要多。

主要有两个问题出现

**第一个：搜索分页的问题**
原来前端搜索的时候呢，所有的数据都在本地，那么用户搜索的结果可以一次性都全部展示出来。
改为后端搜索之后呢，搜索的结果可能很多，所以并没有一次性将所有的数据都返回给前端进行展示，而是需要前端通过分页的方式进行加载。这样做的好处

1是缩短用户搜索的响应时间，用户感受上就是搜索很快，2是当搜索结果很多的时候，用户并不会每一条都去查看，过多的返回数据只会浪费用户的流量，只有用户想看更多的时候我们才去加载更多的结果展示给用户。

但是当时评估的时候并没有考虑到新的接口需要分页加载，在测试时出现了原本搜索结果应为50，而前端只展示20条的现象，就是由于前端没有做分页的处理，而未获取后续数据。
**第二个问题：代理人当前团队置顶的功能消失了**

如果搜索的结果有代理人当前所在的团队，我们需要把它置于结果的首位

因为之前前端搜索的时候呢，所有的数据都在本地，所以只要在其中找到代理人所在的团队，放到第一个就可以了。
改为后端搜索之后呢，由于结果是分页返回的，当前所在团队在哪一页无法确定，可能在搜索结果的第2页，第3页数据里面才包含代理人所在的团队，那么前端在结果里面找不到代理人所在的团队，也就自然没有办法展示，造成了这个“置顶”功能消失了的感觉。



在这件事上的反思总结是

1.再紧急的任务，都应该做好充足的准备和方案，因为只有把问题彻底弄清楚，才不会忙中出错，出现返工延期的现象

2.有时需求开发中不可避免需要像上述前端写死200的临时方案，应该更慎重，同时定期追踪，有了解决方案及时调整



接下来介绍下步骤引导组件的沉淀

在界面引入新功能或者在对新人介绍产品时往往有如下这种引导的需求

大家先看看这两个动图，左侧呢是原来引导的实现效果，右侧我优化后的展示效果

接下来我来介绍一下原来引导实现，以及它存在的开发及体验上的问题

可以看到，主要是在界面上使用图片来实现引导

我们原来实现引导的方式有两种，一种是只有高亮部分通过图片实现，后面的蒙层通过代码实现，这样导致的问题是在不同大小屏幕的手机上，可能出现高亮部分偏移的现象，导致开发调试的困难

第二种方式，整个引导都采用UI图片实现，这样子能够解决第一种方式中高亮图片偏移的问题，但是又引发了新的问题

整张图片作引导，而这个图片又需要较清晰，往往图片质量比较大，在网络比较差的情况下，就会出现加载渲染慢的问题，影响用户的体验

同时由于是静态图片，往往与当前页面真实呈现不完全一致，用户完成引导后很容易发现内容变化

与此同时一旦页面出现调整，引导图片都要做出相应的替换，增加了开发成本

为了解决这些问题，在实现新的引导时，就考虑通过纯前端代码来实现引导的功能

通过代码来实现高亮，解决了图片高亮的偏移问题

同时解决了整张图片实现引导加载慢，背景不符的问题，提升了用户体验



同类需求开发效率提升



自我评价

首先是开发规范上的成长

第一个是流程规范

做到再小的需求，再小的改动，都严格执行开发流程

第二个是代码的规范：通过 code review 等不断提升代码的可维护性可读性

如了解到了jsdoc规范书写注释，在写函数、参数时的命名，函数，组件的单一职责，判断的及时终止等优化性能

会持续查看之前的代码，对其中不足作出优化

可能这个月看上个月代码，或者看到同事之前的代码有不规范的地方，及时作出改正等



再一个是专业能力上的成长

移动端兼容性，尤其是在做客集集需求时，踩了很多 ios 兼容性的坑，大屏手机适配问题，低版本兼容性问题等

组件化意识的提升，一个是页面组件的抽离，代码可读性和可维护性，提升性能；再一个是步骤引导等公用组件的开发，体会到了公共组件开发与普通组件相比需要更抽离降低耦合性，考虑更全面细致、边界情况，同时要考虑使用成本

**canvas**踩坑，在做早晚安打卡等需求是对海报、小程序码的绘制，在 canvas 绘图，绘字等方面有了自己的心得

沉淀了图片合并下载的解决方案，canvas 绘字如何换行，如何设置行高等问题的解决方案



当然也有一些不足

比如在做复杂需求时，一些边界边界情况或特殊场景无法考虑得十分周全，导致返工现象甚至延期现象

还有偶尔会犯一些低级代码错误，需求上线后出现一些小问题

另外是往往局限于被安排的需求与任务，对整体或其他方面的主动性不足，反思与总结不足



针对这些不足，我也做了近期的规划

1.xx

2.xx

3.xx



我的转正述职汇报到这里就结束了，请大家多多批评，为我继续前行导航