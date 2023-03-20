export class HtmlChecker {

  private content: string[] = [];

  private checkTags(input: string): boolean {
    const stack = [];
    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) == '<' && input.charAt(i + 1) != '/') {
        let tag = "";
        const attributes = {};

        //取得html tag
        while (input.charAt(i) != '>' && input.charAt(i) != ' ' && i < input.length) {
          tag += input.charAt(i);
          i++;
        }

        // 取得 attributes
        while (input.charAt(i) != '>' && i < input.length) {
          if (input.charAt(i) == ' ') {
            let attribute = "";
            let value = "";

            i++;

            // 取得 attribute name
            while (input.charAt(i) != '=' && i < input.length) {
              attribute += input.charAt(i);
              i++;
            }

            i++;

            // 取得 attribute value
            const quote = input.charAt(i);
            i++;

            while (input.charAt(i) != quote && i < input.length) {
              value += input.charAt(i);
              i++;
            }

            attributes[attribute] = value;
          }
          i++;
        }

        stack.push({ tag: tag.replace("<", ""), attributes: attributes });

      } else if (input.charAt(i) == '<' && input.charAt(i + 1) == '/') {
        let tag = "";
        while (input.charAt(i) != '>' && i < input.length) {
          tag += input.charAt(i);
          i++;
        }

        const lastTag = stack.pop();

        if (lastTag?.tag != tag.substring(2)) {
          return false;
        }
      }
    }

    if (stack.length > 0) {

      return false;
    }

    return true;
  }


  public append(char: string): void {
    this.content.push(char);
  }

  public getContent(): string {
    const output = this.content.join("");
    if (this.checkTags(output) === true) {
      this.content = [];
    }
    return output;
  }

}
