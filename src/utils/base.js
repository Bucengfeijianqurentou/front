const base = {
    get() {
        // 获取当前页面URL，动态构建基础路径
        let baseUrl = '';
        // 如果是开发环境，使用代理配置
        if (process.env.NODE_ENV === 'development') {
            baseUrl = '/xiaoyuanzichan/';
        } else {
            // 生产环境，从当前URL构建基础路径
            const location = window.location;
            const pathname = location.pathname;
            // 提取基础路径，假设应用部署在 /xiaoyuanzichan 路径下
            const basePathMatch = pathname.match(/^\/[^\/]+\//);
            if (basePathMatch) {
                baseUrl = basePathMatch[0];
            } else {
                // 默认情况
                baseUrl = '/xiaoyuanzichan/';
            }
            // 使用完整URL（带协议和主机名）
            baseUrl = location.protocol + '//' + location.host + baseUrl;
        }
        
        return {
            url: baseUrl,
            name: "xiaoyuanzichan",
            // 退出到首页链接，使用动态构建的URL
            indexUrl: baseUrl + 'front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "校园资产管理"
        } 
    }
}
export default base
