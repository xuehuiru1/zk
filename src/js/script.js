function UpImg(obj) {
    var defaults = {
            type: ["jpg", "jpeg"],
            size: 3 //mb
        },
        ops = Object.assign({}, defaults, obj);
    this.add = document.querySelector(ops.add);
    this.fileBtn = this.add.querySelector('input');
    this.parent = this.add.parentNode;
    this.upType = ops.type;
    this.upSize = ops.size;
    this.max = ops.count;
    this.addEvent();
}
UpImg.prototype = {
    constructor: UpImg,
    addEvent: function() {
        var that = this;
        this.fileBtn.onchange = function() {
            var files = this.files[0];
            var t = files.type.split('/')[1];
            var error = "";
            if (that.upType.indexOf(t) === -1) {
                error = "请上传" + that.upType.join() + "的格式图片"
            } else if (files.size > that.upSize * 1024 * 1024) {
                error = "请上传小于" + that.upSize + 'mb的文件';
            }
            if (error) {
                alert(error);
                return false;
            }
            var fileObj = new FileReader();
            fileObj.readAsDataURL(files);
            fileObj.onloadstart = function() {
                // console.log('开始上传了')
            };
            fileObj.onloadend = function() {
                // console.log('上传结束')
            };
            fileObj.onload = function() {
                var src = this.result;
                var img = new Image();
                img.src = src;
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                div.className = "col-xs-4 imgbox";
                div.appendChild(div1);
                div1.appendChild(img);
                that.parent.insertBefore(div, that.add);
            };
            if (that.parent.children.length >= that.max) {
                that.add.style.display = 'none';
                return false;
            }
        }
    }
}