<template>
    <div :id="id" ref="el" class="echarts-container"></div>
</template>
<script>
import { shallowRef, computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import * as echarts from "echarts";
// import { graphic } from "echarts/core"; //颜色渐变
import { useElementSize } from "@vueuse/core";

export default {
    props: {
        options: {
            type: Object,
            default: () => {},
        },
        autoPlay: {
            type: Boolean,
            default: () => false,
        },
    },
    setup(props) {
        let _id = uuidv4();
        const el = ref(null);
        const options = computed({
            get: () => props.options,
        });
        const { width, height } = useElementSize(el);
        return {
            el,
            id: _id,
            options,
            width,
            height,
            myChart: shallowRef(null),
            setInt: ref(null)
        };
    },
    watch: {
        options: {
            handler() {
                this.myChart && this.myChart.clear();
                this.$nextTick(() => this.setOptions());
            },
            deep: true,
        },
        //监听外部容器大小改变
        width: {
            handler() {
                this.myChart && this.myChart.resize();
            },
        },
        //监听外部容器大小改变
        height: {
            handler() {
                this.myChart && this.myChart.resize();
            },
        },
    },
    unmounted() {
        const { myChart } = this;
        myChart && myChart.dispose();
        window.removeEventListener("resize", () => {});
    },
    mounted() {
        var chartDom = document.getElementById(this.id);
        var myChart = chartDom && echarts.init(chartDom);
        this.myChart = myChart;
        this.$nextTick(() => {
            this.setOptions();
        });

        //监听屏幕尺寸变化
        window.addEventListener("resize", () => {
            this.myChart && this.myChart.resize();
        });

        myChart.on("click", this.handleClick);

        if (!this.autoPlay) return

        myChart.on('mouseover', () => {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: this.currentIndex,
            })
            this.setInt && clearInterval(this.setInt)
        })

        myChart.on('mouseout', () => {
            this.setInt = setInterval(() => {
                this.autoPlaySelect()
            }, 4000)
        })

        this.setInt = setInterval(() => {
            this.autoPlaySelect()
        }, 4000)
    },
    methods: {
        handleClick(params) {
            this.$emit("itemClick", params);
        },

        setOptions() {
            const { myChart, options } = this;
            myChart &&
                myChart.setOption({
                    color: [
                        "#3269FF",
                        "#FF9671",
                        "#FFC75F",
                        "#00C9A7",
                        "#EE003F",
                        "#BFA975",
                        "#BBCCFF",
                        "#6AFBCF",
                        "#AD3AED",
                        "#829DFF",
                        "#FF586F",
                        "#00A4FF",
                        "#59BAB8",
                        "#C1554D",
                    ],
                    //全局字体样式
                    textStyle: {
                        fontFamily: "v-sans",
                    },
                    animationEasing: "elasticOut",
                    ...options,
                    tooltip: {
                        className: "echarts-tooltip",
                        extraCssText: "z-index: 888;",
                        // extraCssText: `border: 1px solid var(--border-color);
                        //     border-radius: 2px;
                        //     box-shadow: 0px 0px 3px var(--border-color);
                        //     min-width: 80px;
                        //     `,
                        ...options.tooltip,
                    },
                    grid: {
                        top: "20px",
                        left: "10px",
                        containLabel: true,
                        bottom: "10px",
                        right: "10px",
                        ...options.grid,
                    },
                });
        },

        autoPlaySelect() {
            const { myChart } = this
            const { series } = this.options

            if (!Array.isArray(series)) return
            let dataLen = series[0].data.length
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: this.currentIndex,
            })
            this.currentIndex = (this.currentIndex + 1) % dataLen
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: this.currentIndex,
            })
            // 显示 tooltip
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: this.currentIndex,
            })
        },
    },

    beforeUnmount() {
        this.myChart &&
            this.myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: this.currentIndex,
            })
        this.setInt && clearInterval(this.setInt)
    },
};
</script>
<style lang="less">
.echarts-tooltip {
    border: 1px solid var(--border-color) !important;
    border-radius: 2px !important;
    box-shadow: 0px 0px 3px var(--border-color) !important;
    min-width: 80px !important;
}
</style>
