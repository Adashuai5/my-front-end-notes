# 手风琴组件：Collapse 折叠面板

如何解决 collapse 与 collapse-item 之间的边框问题

```
    $border-color: #ddd;
    $border-radius: 4px;
    .collapse-item {
        > .title {
            border: 1px solid $border-color;
            margin: -1px;
            line-height: 32px;
            padding: 0 8px;
            display: flex;
            align-items: center;
        }
        &:first-child {
            .title {
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }
        }
        &:last-child {
            > .title:last-child {
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
        > .content {
            padding: 8px;
        }
    }
```

# 组件思路：单向数据流

永远是父组件通知儿子如何操作，儿子通知爸爸自己变化，然后等爸爸通知再操作
如图：红线通知更新，蓝线只是通知

![](https://upload-images.jianshu.io/upload_images/7094266-e5b0b625348c8554.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// 父组件
mounted() {
            this.eventBus.$emit('update:selected', this.selected)
            this.eventBus.$on('update:addselected', (name) => {
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                if(this.single){
                    selectedCopy = [name]
                }else{
                    selectedCopy.push(name)
                }
                this.eventBus.$emit('update:selected', selectedCopy)
                this.$emit('update:selected', selectedCopy)
            })
            this.eventBus.$on('update:removeselected', (name) => {
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                let index = this.selected.indexOf(name)
                selectedCopy.splice(index, 1)
                this.eventBus.$emit('update:selected', selectedCopy)
                this.$emit('update:selected', selectedCopy)
            })
        }
// 子组件
mounted() {
            this.eventBus && this.eventBus.$on('update:selected', (names) => {
                if (names.indexOf(this.name) >= 0) {
                    this.open = true
                } else {
                    this.open = false
                }
            })
        },
        methods: {
            toggle() {
                if (this.open) {
                    this.eventBus && this.eventBus.$emit('update:removeselected', this.name)
                } else {
                    this.eventBus && this.eventBus.$emit('update:addselected', this.name)
                }
            }
        }
```
