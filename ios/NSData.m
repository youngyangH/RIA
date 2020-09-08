//
//  NSData.m
//  RIAProject
//
//  Created by Huang, Young on 2019/12/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonCrypto.h>

- (NSString *)decryptionType:(CCAlgorithm)decryptionType decryptionStr:(NSString *)baseStr key:(NSString*)key

{
   
    NSData * baseData =  [[NSDataalloc]initWithBase64EncodedString:baseStroptions:NSDataBase64DecodingIgnoreUnknownCharacters];

    NSUInteger dataLength = baseData.length +100+[keydataUsingEncoding:NSUTF8StringEncodingallowLossyConversion:YES].length;

    unsigned char buffer[dataLength];
    memset(buffer, 0,sizeof(char));

    size_t dataOffset = 0;
  
    CCCryptorStatus status =CCCrypt(kCCDecrypt,

                                     decryptionType,

                                     kCCOptionPKCS7Padding|kCCOptionECBMode,

                                     [key UTF8String],

                                     keyLength,

                                     nil,

                                     [baseData bytes],

                                     [baseData length],

                                     buffer,

                                     dataLength,

                                     &dataOffset );

    NSString * decodingStr =nil;

    if (status == 0) {

        NSData * data = [[NSDataalloc]initWithBytes:bufferlength:dataOffset];

        decodingStr =  [[NSStringalloc]initWithData:dataencoding:NSUTF8StringEncoding];

        NSLog(@"解密后的串：[%@]", decodingStr);

    }

    else

        NSLog(@"解密失败；");

    

    return decodingStr;
}
