# Expo Starter

### package

    Android打包Apk:expo build:android -t apk

#### listener

    DeviceEventEmitter.emit('left', 'msg');

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
            alert('收到通知：' + a);
        });
    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

### TODO

    1. upgarade react-native-gesture-handler react-navigation react-navigation-stack (版本冲突报错找不到stack )
    2.yarn web 找不到@/
