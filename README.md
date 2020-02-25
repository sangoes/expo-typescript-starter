# 尼克魔法教学机

### 打包命令

    Android打包Apk:expo build:android -t apk

#### 广播，接口，回调等方法来实现发送和接受通知以及通信

    DeviceEventEmitter.emit('left', '发送了个通知');

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
            alert('收到通知：' + a);
        });
    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

### TODO

    1.升级react-native-gesture-handler react-navigation react-navigation-stack
    2.yarn web 找不到@/
