'use strict';

var should = require('should')
  , fs = require('fs')
  , reader = require('../lib/apkReader.js');


describe('Reader available apk',function(){
	var apk;
    before(function(done){
      apk = reader.available();
      done();
    });

    it('should be an object',function(){
      apk.should.be.a.object;
    });

    it('should contain 3 values for test apk',function(){
      apk.test.should.have.length(3);
    });

    it('should sort values',function(){
      apk.test[0].version.should.eql(3);
      apk.test[2].version.should.eql(12);
    });

    it('should contain filenames',function(){
      apk.test[0].filename.should.be.a.string;
    });

    // How to test watch ?
    // it('should handle file modifications',function(){
    //   var tmpName = '.apk_repo/test2-20.apk';
    //   fs.writeFileSync(tmpName, 'test content');
    //   setTimeout(function() {
    //     apk.test2[4].version.should.eql(42);
    //     fs.unlinkSync(tmpName);
    //   }, 100);
      
    // });
});

describe('Reader last apk',function(){
	it('should have greater version',function(){
      reader.last('test').version.should.eql(12);
    });

    it('should ignore unknown apk name',function(){
      should.not.exist(reader.last('unknown'));
    });
});
