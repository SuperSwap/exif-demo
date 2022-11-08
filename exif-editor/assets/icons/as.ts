

    const jszip = new JSZip();

    for (let i = 0; i < this.uploadedImages.length; i++) {

      // var gps: any = {};
      // gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
      // gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
      // gps[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(this.uploadedImages[i].location.lat);
      // gps[piexif.GPSIFD.GPSLatitudeRef] = this.uploadedImages[i].location.lat >= 0 ? "N" : "S";
      // gps[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(this.uploadedImages[i].location.lng);
      // gps[piexif.GPSIFD.GPSLongitudeRef] = this.uploadedImages[i].location.lng >= 0 ? "E" : "W";
      // var exifObj = { "GPS": gps };
      // var exifbytes = piexif.dump(exifObj);
      // var newData = piexif.insert(exifbytes, this.uploadedImages[i].binary);
      // this.uploadedImages[i].binary = newData;
      // jszip.file(this.uploadedImages[0].file.name, newData, { binary: true });

      // console.log(newData)
      // const blob = this.b64toBlob(this.uploadedImages[i].binary, null, null)
      // const blobUrl = window.URL.createObjectURL(blob);
      const img = new Image();
      img.src = this.uploadedImages[i].src;
      img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
      };
      const that = this;
      img.onload = function () {
        URL.revokeObjectURL(img.src);
        const [newWidth, newHeight] = that.calculateSize(img, that.MAX_WIDTH, that.MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        if (ctx != null) ctx.drawImage(img, 0, 0, newWidth, newHeight);
        var blob = canvas.toDataURL("image/jpg", 1);


        // if (blob != null) {

        //   var fileReader = new FileReader();
        //   fileReader.onload = function (event) {
        //     if (event.target != null) {
        //       console.log(event.target.result)
              var arrayBuffer = blob;
              console.log(window.atob(arrayBuffer.replace(/^data:image\/(jpg);base64,/, "")))

              var gps: any = {};
              gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
              gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
              gps[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(that.uploadedImages[i].location.lat);
              gps[piexif.GPSIFD.GPSLatitudeRef] = that.uploadedImages[i].location.lat >= 0 ? "N" : "S";
              gps[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(that.uploadedImages[i].location.lng);
              gps[piexif.GPSIFD.GPSLongitudeRef] = that.uploadedImages[i].location.lng >= 0 ? "E" : "W";
              var exifObj = { "GPS": gps };
              var exifbytes = piexif.dump(exifObj);
              var newData = piexif.insert(exifbytes, piexif.load(window.atob(decodeURIComponent(arrayBuffer.replace(/^data:image\/(png|jpg);base64,/, "")))));
              jszip.file(that.uploadedImages[0].file.name, newData, { binary: true });
              jszip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, 'output.zip');
              })
        //     }
        //   };
        //   fileReader.readAsArrayBuffer(blob);
        // }

      };



      // var base64Image = "data:image/jpg;base64," + window.btoa(newData);;
      // // save image to disk
      // var link = document.createElement("a");

      // document.body.appendChild(link); // for Firefox

      // link.setAttribute("href", base64Image);
      // link.setAttribute("download", "mrHankey.jpg");
      // link.click();
    }